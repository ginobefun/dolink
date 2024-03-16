import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center justify-start border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <Link href="#">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-8 w-auto mr-2" />
                </Link>
                <Link href="#" className="flex items-center">
                    <span className="pl-2">DoLink</span>
                </Link>
            </div>
        </header>
    );
}
