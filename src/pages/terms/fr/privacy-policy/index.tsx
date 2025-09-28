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
  <div className="mt-3 mb-3 text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">Politique de confidentialité de Champ de Prospérité</div>
  <div className="">
      <p>Cette politique de confidentialité régit votre utilisation de la plateforme Champ de Prospérité. Champ de Prospérité est une application mobile conçue pour aider les agriculteurs algériens à gérer leurs champs, cultures, activités agricoles, inventaire, prêts, et à accéder aux mises à jour météorologiques et du marché.</p>

      <h4 className="mt-2 text-2xl text-header-red">Quelles informations l'application collecte-t-elle et comment sont-elles utilisées ?</h4>
      <p className="mt-1 text-medium"><strong>Informations fournies par l'utilisateur</strong></p>
      <p>L'application collecte les informations que vous fournissez lors du téléchargement et de l'inscription. L'inscription est facultative. Lorsque vous nous contactez via l'application, vous pouvez fournir votre nom, adresse e-mail, numéro de téléphone et nom d'utilisateur.</p>
      <p>Nous pouvons utiliser ces informations pour vous contacter avec des mises à jour importantes, des notifications ou des promotions liées à l'application et à ses services.</p>

      <p className='mt-1 text-medium'><strong>Informations collectées automatiquement</strong></p>
      <p>L'application peut également collecter certaines informations automatiquement, notamment le type de votre appareil, le système d'exploitation, le type de navigateur mobile et vos habitudes d'utilisation au sein de l'application.</p>

      <h4 className="mt-2 text-2xl text-header-red">Des tiers ont-ils accès aux informations collectées par l'application ?</h4>
      <p>Seules des données agrégées et anonymisées sont partagées avec des services externes pour améliorer l'application. Nous partageons vos informations avec des tiers uniquement comme décrit dans cette politique de confidentialité.</p>
      <p className='mt-1'>Nous pouvons divulguer les informations fournies par l'utilisateur et celles collectées automatiquement :</p>
      <ul className='list-disc px-5'>
        <li><p>comme l'exige la loi, par exemple pour se conformer à une assignation ou à un processus légal ;</p></li>
        <li><p>lorsque nous estimons que la divulgation est nécessaire pour protéger nos droits, votre sécurité ou celle des autres, ou pour enquêter sur une fraude ;</p></li>
        <li><p>à nos prestataires de services de confiance qui travaillent en notre nom et doivent respecter cette politique de confidentialité ;</p></li>
        <li><p>en cas de fusion, acquisition ou vente d'actifs, vous serez informé des changements de propriétaire et des choix concernant vos informations.</p></li>
      </ul>

      <h4 className="mt-2 text-2xl text-header-red">Quels sont mes droits de refus ?</h4>
      <p>Vous pouvez arrêter toute collecte d'informations en désinstallant l'application. Vous pouvez également demander à vous désinscrire par e-mail à <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>

      <h4 className="mt-2 text-2xl text-header-red">Politique de conservation des données et gestion de vos informations</h4>
      <p>Les données fournies par l'utilisateur seront conservées tant que vous utilisez l'application et pour une période raisonnable ensuite. Les informations collectées automatiquement sont conservées pendant 24 mois et peuvent ensuite être agrégées. Pour demander la suppression de vos données, contactez-nous à <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>

      <h4 className="mt-2 text-2xl text-header-red">Enfants</h4>
      <p>Nous ne collectons pas sciemment d'informations auprès d'enfants de moins de 13 ans. Si un parent découvre que son enfant a soumis des informations sans consentement, veuillez nous contacter à <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>, et nous supprimerons ces informations rapidement.</p>

      <h4 className="mt-2 text-2xl text-header-red">Sécurité</h4>
      <p>Nous mettons en œuvre des mesures physiques, électroniques et procédurales pour protéger vos informations. L'accès est limité aux personnes autorisées uniquement. Cependant, aucun système de sécurité n'est totalement inviolable.</p>

      <h4 className="mt-2 text-2xl text-header-red">Modifications</h4>
      <p>Cette politique de confidentialité peut être mise à jour occasionnellement. Les changements seront publiés ici et, le cas échéant, vous serez informé par e-mail. L'utilisation continue constitue l'acceptation de la politique mise à jour.</p>

      <h4 className="mt-2 text-2xl text-header-red">Votre consentement</h4>
      <p>En utilisant l'application, vous consentez au traitement de vos informations tel que décrit dans cette politique de confidentialité, y compris la collecte, le stockage, l'utilisation et la divulgation.</p>

      <h4 className="mt-2 text-2xl text-header-red">Contactez-nous</h4>
      <p>Si vous avez des questions concernant cette politique de confidentialité ou nos pratiques, contactez-nous à <Link href="mailto:team@subzeal.com" className='text-blue-500'>team@subzeal.com</Link>.</p>
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
