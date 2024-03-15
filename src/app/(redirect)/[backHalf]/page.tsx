import { getLink } from '@/lib/action';
import { notFound, redirect } from "next/navigation";

export default async function Redirect({ params }: { params: { backHalf: string } }) {
    const { backHalf } = params;
    const link = await getLink(backHalf);
    if (!link) {
        return notFound();
    }

    redirect(link.destination);
}

