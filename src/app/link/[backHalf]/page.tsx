import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLink } from '@/lib/action';
import { notFound } from "next/navigation";

export default async function LinkPage({ params }: { params: { backHalf: string } }) {
    const { backHalf } = params;
    console.log(backHalf);
    const link = await getLink(backHalf);
    console.log(link);
    if (!link) {
        return notFound();
    }

    const url = new URL(link.destination);
    const domain = url.hostname;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">


                <h1 className="text-2xl font-semibold">{domain} – {link.title || 'untitled'}</h1>
                <div className="flex space-x-2">
                    <Button variant="ghost">
                        <CopyIcon className="text-gray-600" />
                    </Button>
                    <Button variant="ghost">
                        <FileEditIcon className="text-gray-600" />
                    </Button>
                    <Button variant="ghost">
                        <ShareIcon className="text-gray-600" />
                    </Button>
                    <Button variant="ghost">
                        <MoreHorizontalIcon className="text-gray-600" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center space-x-4 mb-4">
                <p className="text-gray-600 truncate">
                    {link.destination}
                </p>
            </div>
            <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary">dol.ink/{backHalf}</Badge>
            </div>
            <div className="flex items-center space-x-4 mb-6">
                <CalendarIcon className="text-gray-600" />
                <p className="text-gray-600">{new Date(link.createdAt).toLocaleString()}</p>
            </div>
        </div>
    )
}


function CalendarIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}


function CopyIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    )
}


function FileEditIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
        </svg>
    )
}


function MoreHorizontalIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    )
}


function ShareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}