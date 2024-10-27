import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type Document } from "@/types/document";
import { read } from "@/server/action";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/signin");
    },
  });

  const filteredDocuments = useMemo(() => {
    return documents.filter(
      (doc) =>
        doc.docName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [documents, searchTerm]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        const docData = await read(session.user.email);
        if (docData.status === "success" && docData.data) {
          setDocuments(docData.data);
        } else {
          console.error("Error fetching Documents:", docData);
        }
      } catch (error) {
        console.error("Error reading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [status, session?.user?.email]);

  return {
    setDocuments,
    searchTerm,
    setSearchTerm,
    loading,
    status,
    filteredDocuments,
    session,
  };
}