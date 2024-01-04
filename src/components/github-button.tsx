import { Github } from "lucide-react"
import { Button } from "@/components/ui";
import Link from "next/link";

export function GithubButton() {
    return (
        <Link href="https://github.com/Renan04lima/lexter-algorithm-interview" rel="noopener noreferrer" target="_blank">
            <Button variant={"outline"}>
                <Github className="w-4 h-4 mr-2" />
                GitHub
            </Button>
        </Link>
    );
}
