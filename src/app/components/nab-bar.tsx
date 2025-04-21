import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth";
import { PenLine } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";
export async function NavBar() {
  const userData = await getCurrentUser();

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-serif text-2xl text-purple-700">Meus Pensamentos</h2>
      <div className="flex items-center gap-4"></div>
      {userData?.user ? (
         <>
          <Link href="/novo-post">
              <Button className="bg-purple-700 hover:bg-purple-800">
                 <PenLine className="mr-2 h-4 w-4"/>
                    Novo Pensamento
              </Button>
          </Link>
            <UserMenu user={userData.profile} />
         </>
      ) : (
        <Link href="/login">
        <Button className="bg-purple-700 hover:bg-purple-800">Entrar</Button>
        </Link>
      )}

      </div>
  );
}
