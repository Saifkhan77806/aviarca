import { Button } from "@/components/ui/button";
import { serverUser } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {

  const user = await serverUser()

  console.log(user?.role)



  return (
    <>
    <div className="w-full h-full">

      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to the MFC Products</h1>
        <p className="mt-4 text-lg">Please select an option from the sidebar.</p>
        <Link href={"/login"}>
        <Button className="mt-4">Get Started</Button>
        </Link>
      </div>

    </div>
    </>
  );
}
