import Link from "next/link";
const BUSINESS_NAME = "Champ de Prospérité";
const LEGAL_NAME = "Subzeal (Private) limited";
const SITE_URL = "";

const TermsOfServicePage = () => {
  return (
<div className="m-10"> 
  <div className="container flex items-center justify-center w-full">
    <div className="w-full "> 
      <h1 className="text-2xl font-bold uppercase">Conditions d'utilisation</h1>
      <p className="mt-2">Dernière mise à jour : 28 septembre 2025</p>
      
      {/* Fin des conditions */}

      <div>
        {/* Accord sur les conditions */}
        <div className="mt-5">
          <h2 className="text-lg font-bold uppercase">Accord sur les conditions</h2>
          <div className="">
            Ces Conditions d'utilisation constituent un accord juridiquement contraignant entre vous, que ce soit en votre nom personnel ou au nom d'une entité (« vous »), et <span>{LEGAL_NAME}</span>, opérant sous le nom <span>{BUSINESS_NAME}</span> (« <span>{BUSINESS_NAME}</span> », « nous », « notre »), concernant votre accès et utilisation du site <Link href={SITE_URL} className="text-blue-500 ml-1 underline">{SITE_URL}</Link> ainsi que de tout autre média associé, site mobile ou application mobile lié ou connecté (collectivement, le « Site »). Vous acceptez qu'en accédant au Site, vous avez lu, compris et accepté d'être lié par toutes ces Conditions d'utilisation. SI VOUS N'ACCEPTEZ PAS TOUTES CES CONDITIONS D'UTILISATION, VOUS ÊTES EXPRESSÉMENT INTERDIT D'UTILISER LE SITE.
          </div>
          <div className="mt-5">
            Les conditions supplémentaires ou documents pouvant être publiés sur le Site de temps à autre sont expressément incorporés par référence. Nous nous réservons le droit, à notre seule discrétion, de modifier ces Conditions d'utilisation à tout moment et pour toute raison. Nous vous informerons des changements en mettant à jour la date de « Dernière mise à jour » et vous renoncez à tout droit de recevoir un avis spécifique pour chaque changement. Il est de votre responsabilité de consulter régulièrement ces Conditions pour rester informé des mises à jour. Vous serez soumis aux modifications et considéré comme ayant accepté les nouvelles conditions par votre utilisation continue du Site après leur publication.
          </div>
          <div className="mt-5">
            Les informations fournies sur le Site ne sont pas destinées à la distribution ou à l'utilisation par des personnes ou entités dans des juridictions où cela serait contraire à la loi ou qui nous imposerait des obligations d'enregistrement. Les utilisateurs accédant au Site depuis d'autres lieux le font à leurs propres risques et doivent respecter la législation locale applicable.
          </div>
          <div className="mt-5">
            Le Site est destiné aux utilisateurs âgés d'au moins 13 ans. Les utilisateurs mineurs dans leur juridiction (généralement moins de 18 ans) doivent avoir l'autorisation et la supervision directe de leurs parents ou tuteur pour utiliser le Site. Si vous êtes mineur, vos parents ou tuteur doivent lire et accepter ces Conditions avant votre utilisation du Site.
          </div>
        </div>
        {/* fin Accord sur les conditions */}

        {/* Déclarations de l'utilisateur */}
        <div className="mt-5">
          <h2 className="text-lg font-bold uppercase">Déclarations de l'utilisateur</h2>
          <div className="mt-5">
            En utilisant le Site, vous déclarez et garantissez que : (1) toutes les informations d'inscription que vous soumettez seront vraies, exactes, actuelles et complètes ; (2) vous maintiendrez l'exactitude de ces informations et les mettrez à jour rapidement si nécessaire ; (3) vous avez la capacité juridique et acceptez de respecter ces Conditions d'utilisation ; (4) vous avez au moins 13 ans ; (5) vous n'êtes pas mineur dans votre juridiction ou, si vous l'êtes, vous avez l'autorisation parentale pour utiliser le Site ; (6) vous n'accéderez pas au Site par des moyens automatisés ou non humains ; (7) vous n'utiliserez pas le Site à des fins illégales ou non autorisées ; et (8) votre utilisation du Site ne violera aucune loi applicable. Si vous fournissez des informations fausses, inexactes, obsolètes ou incomplètes, nous nous réservons le droit de suspendre ou de supprimer votre compte et de refuser tout accès actuel ou futur au Site.
          </div>
        </div>
        {/* Fin Déclarations */}

        {/* Clause de non-responsabilité */}
        <div className="mt-5">
          <h2 className="text-lg font-bold uppercase">Clause de non-responsabilité</h2>
          <div className="mt-5">
            LE SITE EST FOURNI TEL QUEL ET SELON DISPONIBILITÉ. VOUS ACCEPTEZ QUE VOTRE UTILISATION DU SITE ET DE NOS SERVICES SE FASSE À VOS PROPRES RISQUES. DANS LA MESURE PERMISE PAR LA LOI, NOUS DÉCLINONS TOUTE GARANTIE, EXPRESSE OU IMPLICITE, CONCERNANT LE SITE ET SON UTILISATION, Y COMPRIS LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D'ADAPTATION À UN USAGE PARTICULIER ET DE NON-VIOLATION. NOUS NE GARANTISSONS PAS L'EXACTITUDE OU L'EXHAUSTIVITÉ DU CONTENU DU SITE OU DES SITES LIÉS ET NE SERONS PAS RESPONSABLES POUR TOUT (1) ERREUR OU INEXACTITUDE DU CONTENU, (2) DOMMAGE PERSONNEL OU MATÉRIEL, (3) ACCÈS NON AUTORISÉ À NOS SERVEURS OU DONNÉES, (4) INTERRUPTION DE TRANSMISSION, (5) VIRUS OU LOGICIELS MALVEILLANTS, (6) ERREURS OU OMISSIONS DE CONTENU. NOUS NE GARANTISSONS PAS ET NE SOMMES PAS RESPONSABLES DES PRODUITS OU SERVICES FOURNIS PAR DES TIERS.
          </div>
        </div>
        {/* Fin Clause de non-responsabilité */}

        {/* Contactez-nous */}
        <div className="mt-5">
          <h2 className="text-lg font-bold uppercase">Contactez-nous</h2>
          <div className="mt-5">
            Pour résoudre une plainte concernant le Site ou obtenir des informations supplémentaires, veuillez nous contacter à :
          </div>

          <div className="mt-3 text-slate-600">
            <div>Champ de Prospérité</div>
            <div>Allées Ben Boulaid</div>
            <div>Batna</div>
            <div>Algérie</div>
            <div>Téléphone : +213 558 372 745</div>
          </div>
        </div>
        {/* Fin Contactez-nous */}

      </div>
      {/* Fin des conditions */}
    </div>
  </div>
</div>

  );
};// end of TermsOfServicePage ::

export default TermsOfServicePage;

