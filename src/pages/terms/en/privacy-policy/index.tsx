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
<section id="" className="m-10">
  <div className="mt-3 mb-3 text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">Champ de Prospérité Privacy Policy</div>
  <div className="">
      <p>This privacy policy governs your use of the Champ de Prospérité platform. Champ de Prospérité is a mobile application designed to help Algerian farmers manage their fields, crops, farm activities, inventory, loans, and access weather and market updates.</p>

      <h4 className="mt-2 text-2xl text-header-red">What information does the Application obtain and how is it used?</h4>
      <p className="mt-1 text-medium"><strong>User Provided Information</strong></p>
      <p>The Application obtains information you provide when you download and register the app. Registration is optional. When you contact us through the application, you may provide your name, email address, phone number, and username.</p>
      <p>We may use this information to contact you with important updates, notices, or promotions related to the app and its services.</p>

      <p className='mt-1 text-medium'><strong>Automatically Collected Information</strong></p>
      <p>The Application may also collect certain information automatically, including your device type, operating system, mobile browser type, and usage patterns within the app.</p>

      <h4 className="mt-2 text-2xl text-header-red">Do third parties see or have access to information obtained by the Application?</h4>
      <p>Only aggregated and anonymized data is shared with external services to improve the Application. We share your information with third parties only as described in this privacy policy.</p>
      <p className='mt-1'>We may disclose User Provided and Automatically Collected Information:</p>
      <ul className='list-disc px-5'>
        <li><p>as required by law, such as to comply with a subpoena or legal process;</p></li>
        <li><p>when we believe disclosure is necessary to protect our rights, your safety, or the safety of others, or to investigate fraud;</p></li>
        <li><p>with our trusted service providers who operate on our behalf and are required to follow this privacy policy;</p></li>
        <li><p>in the event of a merger, acquisition, or sale of assets, you will be notified of changes in ownership and any choices regarding your information.</p></li>
      </ul>

      <h4 className="mt-2 text-2xl text-header-red">What are my opt-out rights?</h4>
      <p>You can stop all collection of information by uninstalling the Application. You may also request to opt-out via email at <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>

      <h4 className="mt-2 text-2xl text-header-red">Data Retention Policy, Managing Your Information</h4>
      <p>User Provided data will be retained as long as you use the Application and for a reasonable period thereafter. Automatically Collected Information is retained for up to 24 months and may then be aggregated. To request deletion of your data, contact us at <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>

      <h4 className="mt-2 text-2xl text-header-red">Children</h4>
      <p>We do not knowingly collect information from children under 13. If a parent becomes aware their child has submitted information without consent, please contact us at <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>, and we will delete it promptly.</p>

      <h4 className="mt-2 text-2xl text-header-red">Security</h4>
      <p>We implement physical, electronic, and procedural safeguards to protect your information. Access is limited to authorized personnel only. However, no security system is completely secure.</p>

      <h4 className="mt-2 text-2xl text-header-red">Changes</h4>
      <p>This Privacy Policy may be updated occasionally. Changes will be posted here and, when appropriate, you will be notified via email. Continued use constitutes acceptance of the updated policy.</p>

      <h4 className="mt-2 text-2xl text-header-red">Your Consent</h4>
      <p>By using the Application, you consent to the processing of your information as described in this Privacy Policy, including collection, storage, use, and disclosure.</p>

      <h4 className="mt-2 text-2xl text-header-red">Contact us</h4>
      <p>If you have questions about this Privacy Policy or our practices, contact us at <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>
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
