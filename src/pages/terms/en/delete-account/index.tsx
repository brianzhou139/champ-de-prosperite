import Head from 'next/head'
import Image from 'next/image'
import { useAuth } from '@context/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function PrivacyPolicy({ipAddress}:{ipAddress:string}) {
  const router = useRouter(); // this is new
  const {user,dbuser,userLoading} = useAuth();
  
  if (typeof window !== 'undefined') {
    //router.push('/zimsec');
    //return;
  }

  return (
  <div>
<section className="m-10">
  <div className="container flex items-center justify-center w-full">
    <div className="w-full">
      <h1 className="text-2xl font-bold uppercase">Delete Account</h1>
      <p className="mt-2">Last updated: September 28, 2025</p>

      <div className="mt-5">
        <p>
          You can request to delete your Champ de Prospérité account and all personal data stored on our platform. Once your account is deleted, this action is <strong>irreversible</strong> and all your information will be permanently removed.
        </p>

        <h2 className="mt-5 text-lg font-bold uppercase">How to delete your account</h2>
        <ul className="list-disc px-5 mt-2">
          <li>Log in to your account via the Champ de Prospérité app.</li>
          <li>Go to your account settings and select "Delete My Account".</li>
          <li>Confirm your decision. You will receive a confirmation email.</li>
        </ul>

        <h2 className="mt-5 text-lg font-bold uppercase">Processing time</h2>
        <p className="mt-2">
          Complete deletion of your account may take up to <strong>30 days</strong> after the request. During this time, your data will no longer be accessible to you or other users.
        </p>

        <h2 className="mt-5 text-lg font-bold uppercase">Questions or support</h2>
        <p className="mt-2">
          If you have any questions or experience issues deleting your account, please contact our support team at:
          <Link href="mailto:team@subzeal.com" className="text-blue-500 ml-1 underline">team@subzeal.com</Link>.
        </p>

        <div className="mt-5 text-slate-600">
          <div>Champ de Prospérité</div>
          <div>Allées Ben Boulaid</div>
          <div>Batna</div> 
          <div>Algeria</div> 
          <div>Phone: +213 558 372 745</div> 
        </div>
      </div>
    </div>
  </div>
</section>

  </div>
  )
}


// This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
// oops
export async function getServerSideProps(context: any) {
  // getting the user ip address
  const forwarded = context.req.headers['x-forwarded-for'];
  const ipAddress = typeof forwarded === 'string' ? forwarded.split(/, /)[0] : context.req.socket.remoteAddress;

  return {
    props: {
      //allfiles,
      ipAddress
    },
  };
}
