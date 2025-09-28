import Link from "next/link";
const BUSINESS_NAME = "Champ de Prospérité";
const LEGAL_NAME = "Subzeal (Private) limited";
const SITE_URL = "";

const TermsOfServicePage = () => {
  return (
      <div className="m-10">
        <div className="container flex items-center justify-center w-full">
          <div className="w-full ">
            <h1 className="text-2xl font-bold uppercase">Terms of service</h1>
            <p className="mt-2">Last updated september 28, 2025</p>
            
            {/* End of terms */}
            
            <div>
              {/* Agreement to terms */}
              <div className="mt-5">
                <h2 className="text-lg font-bold uppercase">Agreement to terms</h2>
                <div className="">
                  These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) and <span>{LEGAL_NAME}</span>, doing business as <span>{BUSINESS_NAME}</span> (&quot;<span>{BUSINESS_NAME}</span>&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), concerning your access to and use of the <Link href={SITE_URL} className="text-blue-500 ml-1 underline">{SITE_URL}</Link>  website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the &quot;Site&quot;). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE.
                </div>
                <div className="mt-5">
                  Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Use at any time and for any reason. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Terms of Use, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Use to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Use by your continued use of the Site after the date such revised Terms of Use are posted.
                </div>
                <div className="mt-5">
                  The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                </div>
                <div className="mt-5">
                  The Site is intended for users who are at least 13 years of age. All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Use prior to you using the Site.
                </div>
              </div>
              {/*end of Agreement to terms */}

              {/* User Representations */}
              <div className="mt-5">
                <h2 className="text-lg font-bold uppercase">User Representations</h2>
                <div className="mt-5">
                  By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;&nbsp;(3) you have the legal capacity and you agree to comply with these Terms of Use; (4) you are not under the age of 13;&nbsp;(5) you are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Site; (6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (7) you will not use the Site for any illegal or unauthorized purpose; and (8) your use of the Site will not violate any applicable law or regulation.If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).
                </div>
              </div>
              {/*End of Representations */}

              {/* Disclaimer */}
              <div className="mt-5">
                <h2 className="text-lg font-bold uppercase">Disclaimer</h2>
                <div className="mt-5">
                  THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SITE&#39;S CONTENT OR THE CONTENT OF ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY    FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND /OR ANY AND ALL PERSONAL INFORMATION AND /OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE BY ANY THIRD PARTY, AND /OR (6) ANY   ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR  OTHERWISE MADE AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A  PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE APPROPRIATE.
                </div>
              </div>
              {/** End of Dsiclaimer */}


              {/* Contact US */}
              <div className="mt-5">
                <h2 className="text-lg font-bold uppercase">Contact Us</h2>
                <div className="mt-5">
                  In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:&nbsp;
                </div>

                {/* Zim Address */}
                <div className="mt-3 text-slate-600">
                  <div>Champ de Prospérité</div>
                  <div>Allées Ben Boulaid</div>
                  <div>Batna</div>
                  <div>Algeria</div>
                  <div>Phone : +213 558 372 745</div>
                </div>
                {/* End of Zim */}

              </div>
              {/* End of Contact Us */}

            </div>
            {/* Terms of terms */}
          </div>
        </div>
      </div>
  );
};// end of TermsOfServicePage ::

export default TermsOfServicePage;

