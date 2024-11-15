// Footer.js
export default function Footer() {
    return (
        <footer className="bg-blue-600 p-4 text-white text-center">
            <p className="text-sm">© {new Date().getFullYear()} Umpire App. All rights reserved.</p>
            <div className="mt-2 space-x-4">
                <a href="/terms" className="hover:underline">Terms of Service</a>
                <a href="/privacy" className="hover:underline">Privacy Policy</a>
            </div>
        </footer>
    );
}
