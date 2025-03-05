import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
            <span>About You não encontrado, <Link href="/" className="text-red-500">Crie já o seu {"❤️"}</Link></span>
        </div>
    );
}