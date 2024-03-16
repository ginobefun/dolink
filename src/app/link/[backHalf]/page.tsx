"use client"

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa";
import { Link as LinkType } from '@/lib/definition';
import { domain } from "@/lib/constant";

function LinkPage({ params }: { params: { backHalf: string } }) {
    const { backHalf } = params;
    const [link, setLink] = useState<LinkType | null>(null);
    const [copied, setCopied] = useState(false);

    const url = new URL(domain);
    const prefix = url.hostname;

    useEffect(() => {
        if (backHalf) {
            fetch(`/api/link/${backHalf}`)
                .then(response => response.json())
                .then((data: LinkType) => {
                    setLink(data);
                })
                .catch(console.error);
        }
    }, [backHalf]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => setCopied(true))
            .catch(err => console.error('Failed to copy text: ', err));
    };

    if (!link) {
        return <div>Loading...</div>; // Or any other loading state representation
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl border-t-2 border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">{link.title || 'Untitled'}</h1>
            </div>
            <div className="flex items-center space-x-4 mb-4">
                {link.destination}
            </div>
            <div className="flex items-center space-x-4 mb-4">
                <Link href={`/link/${backHalf}`} className="text-blue-500 hover:underline">
                    {prefix}/{backHalf}
                </Link>
                <button onClick={() => handleCopy(`${prefix}/${backHalf}`)}>
                    <FaRegCopy className="inline cursor-pointer" onClick={() => handleCopy(`${prefix}/${backHalf}`)} />
                </button>
                {copied && <span className="text-sm text-gray-500">Copied!</span>}
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <p className="text-gray-600 dark:text-gray-400">{new Date(link.createdAt).toLocaleString()}</p>
            </div>
        </div>
    );
}

export default LinkPage;