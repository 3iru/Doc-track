"use client";

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
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "../loading";
import { useDocuments } from "@/app/hooks/UseDocuments";
export default function History() {
  const {
    filteredDocuments,
    searchTerm,
    setSearchTerm,
    loading,
    status,
  } = useDocuments();

  if (loading || status === "loading") {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Document History</h1>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

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
                <TableHead className="whitespace-nowrap">Document</TableHead>
                <TableHead className="whitespace-nowrap">Employee</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="whitespace-nowrap">Issued Time</TableHead>
                <TableHead className="whitespace-nowrap">
                  Returned Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.docId}>
                  <TableCell className="font-medium">
                    {doc.docName}
                  </TableCell>
                  <TableCell>{doc.employeeName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doc.status === "Returned"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(doc.dateIssued).toLocaleDateString(
                      "default",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    {doc.dateReturned
                      ? new Date(doc.dateReturned).toLocaleDateString(
                          "default",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
