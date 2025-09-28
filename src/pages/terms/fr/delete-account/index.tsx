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
      <h1 className="text-2xl font-bold uppercase">Supprimer le compte</h1>
      <p className="mt-2">Dernière mise à jour : 28 septembre 2025</p>

      <div className="mt-5">
        <p>
          Vous pouvez demander la suppression de votre compte Champ de Prospérité et de toutes vos données personnelles stockées sur notre plateforme. Une fois votre compte supprimé, cette action est <strong>irréversible</strong> et toutes vos informations seront définitivement effacées.
        </p>

        <h2 className="mt-5 text-lg font-bold uppercase">Comment supprimer votre compte</h2>
        <ul className="list-disc px-5 mt-2">
          <li>Connectez-vous à votre compte via l'application Champ de Prospérité.</li>
          <li>Allez dans les paramètres du compte et sélectionnez "Supprimer mon compte".</li>
          <li>Confirmez votre décision. Vous recevrez un e-mail de confirmation.</li>
        </ul>

        <h2 className="mt-5 text-lg font-bold uppercase">Délai de traitement</h2>
        <p className="mt-2">
          La suppression complète de votre compte peut prendre jusqu'à <strong>30 jours</strong> après la demande. Pendant ce temps, vos données ne seront plus accessibles par vous ou par d'autres utilisateurs.
        </p>

        <h2 className="mt-5 text-lg font-bold uppercase">Questions ou assistance</h2>
        <p className="mt-2">
          Si vous avez des questions ou rencontrez des problèmes lors de la suppression de votre compte, contactez notre équipe d'assistance à :
          <Link href="mailto:team@subzeal.com" className="text-blue-500 ml-1 underline">team@subzeal.com</Link>.
        </p>

        <div className="mt-5 text-slate-600">
          <div>Champ de Prospérité</div>
          <div>Allées Ben Boulaid</div>
          <div>Batna</div>
          <div>Algérie</div>
          <div>Téléphone : +213 558 372 745</div>
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
