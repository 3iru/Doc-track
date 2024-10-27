"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, History, FileText, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import { type Document } from "@/types/document";
import LoadingScreen from "../loading";
import { createNewDocument, update } from "@/server/action";
import { useDocuments } from "@/app/hooks/UseDocuments";

export default function DocumentTracker() {
  const {
    setDocuments,
    searchTerm,
    setSearchTerm,
    loading,
    status,
    filteredDocuments,
    session,
  } = useDocuments();

  const [newDocument, setNewDocument] = useState({ name: "", employee: "" });

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }

  const addDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = session?.user?.id;
    if (!id) {
      console.error("User ID is not available");
      return;
    }

    const docIds = newDocument.name
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const documentsToCreate: Document[] = docIds.map((docId) => ({
      docId: crypto.randomUUID(),
      docName: docId,
      employeeName: newDocument.employee,
      dateIssued: new Date().toISOString(),
      status: "Pending",
      userId: id,
    }));

    setDocuments((prevDocs) => [...prevDocs, ...documentsToCreate]);
    setNewDocument({ name: "", employee: "" });

    try {
      const result = await createNewDocument(documentsToCreate);
      if (result.status !== "success") {
    
        setDocuments((prevDocs) =>
          prevDocs.filter(
            (doc) =>
              !documentsToCreate.some((newDoc) => newDoc.docId === doc.docId)
          )
        );
        console.error("Error creating documents:", result);
      }
    } catch (error) {
    
      setDocuments((prevDocs) =>
        prevDocs.filter(
          (doc) =>
            !documentsToCreate.some((newDoc) => newDoc.docId === doc.docId)
        )
      );
      console.error("Error creating documents:", error);
    }
  };

  const markAsReturned = async (id: string) => {
    if (!session?.user?.id) return;
    await update(id, session.user.id);
    setDocuments((prevDocs) =>
      prevDocs.map((doc) =>
        doc.docId === id
          ? {
              ...doc,
              status: "Returned",
              dateReturned: new Date().toISOString(),
            }
          : doc
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold flex items-center">
            <FileText className="mr-2 h-8 w-8 text-blue-500" />
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 text-transparent bg-clip-text">
              <a href="/">Welcome to DocTrack!</a>
            </span>
            <Sparkles className="ml-2 h-6 w-6 text-yellow-400 animate-pulse" />
          </h1>
          <Link href="/history">
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" /> View History
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Issue New Document</h2>
            <form onSubmit={addDocument} className="space-y-4">
              <div>
                <Label htmlFor="documentName">Document Name</Label>
                <Input
                  id="documentName"
                  value={newDocument.name}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, name: e.target.value })
                  }
                  placeholder="Enter document name(s) separated by commas to add multiple"
                  required
                />
              </div>
              <div>
                <Label htmlFor="employeeName">Employee Name</Label>
                <Input
                  id="employeeName"
                  value={newDocument.employee}
                  onChange={(e) =>
                    setNewDocument({ ...newDocument, employee: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Issue Document
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Document Status</h2>
            <div className="mb-4">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  id="search"
                  placeholder="Search documents or employees"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="border rounded-md overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Document
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Employee
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Date Issued
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments
                    .filter((doc) => doc.status === "Pending")
                    .map((doc) => (
                      <TableRow key={doc.docId}>
                        <TableCell className="font-medium">
                          {doc.docName}
                        </TableCell>
                        <TableCell>{doc.employeeName}</TableCell>
                        <TableCell>
                          {new Date(doc.dateIssued).toLocaleDateString(
                            "default",
                            { hour: "numeric", minute: "numeric", hour12: true }
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">{doc.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsReturned(doc.docId)}
                            className="flex items-center border  transition-all duration-200 hover:bg-primary-dark border-green-400"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Mark Returned</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
