import React from 'react';
import { Link } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';
import { DonateButton } from '@/components/DonateButton';
import { Separator } from '@/components/ui/separator';
import { AnalyticsAndConsent } from '@/components/AnalyticsAndConsent';

const TermsOfService = () => {
  return (
    <div className="min-h-screen w-full bg-[#F8F7FF] flex flex-col">
      {/* Main header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fbf5f7]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between py-3">
            <Link to="/" className="flex items-center focus:outline-none h-10">
              <img
                src="/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-10 w-10 mr-3 cursor-pointer"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif', color: '#064e6b' }}>
                Digital VagaBonding
              </span>
            </Link>
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="container mx-auto px-4 flex-1 w-full" style={{ paddingTop: '80px' }}>
        {/* Page title below header, aligned and sized like body text */}
        
        <div className="max-w-4xl mx-auto">
          <div className="mb-6"></div>
          <div className="rounded-lg shadow-sm p-0 md:p-8 bg-transparent">
            {/* Removed Terms of Service section title */}
            { <h2 className="text-xl font-bold text-gray-900 mb-2">Terms of Service</h2> }
            <p className="text-sm text-gray-500 mb-6">
              Last updated February 7, 2024
            </p>
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p>Agreement to Terms</p>
              <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Digital VagaBonding ("we," "us" or "our"), concerning your access to and use of the Digital VagaBonding website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").</p>
              <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>
              <p>Supplemental Terms of Service or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.</p>
              <p>We will alert you about any changes by updating the “Last updated” date of these Terms of Service, and you waive any right to receive specific notice of each such change.</p>
              <p>It is your responsibility to periodically review these Terms of Service to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Service by your continued use of the Site after the date such revised Terms of Service are posted.</p>
              <p>The information provided on the Site is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.</p>
              <p>Accordingly, those persons who choose to access the Site from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>
              <p>Option 1: The Site is intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to register for the Site.</p>
              <p>Option 2: [The Site is intended for users who are at least 13 years of age.] All users who are minors in the jurisdiction in which they reside (generally under the age of 18) must have the permission of, and be directly supervised by, their parent or guardian to use the Site. If you are a minor, you must have your parent or guardian read and agree to these Terms of Service prior to you using the Site.</p>
              <h2 className="text-2xl font-bold mt-8">Intellectual Property Rights</h2>
              <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.</p>
              <p>The Content and the Marks are provided on the Site “AS IS” for your information and personal use only. Except as expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.</p>
              <p>Provided that you are eligible to use the Site, you are granted a limited license to access and use the Site and to download or print a copy of any portion of the Content to which you have properly gained access solely for your personal, non-commercial use. We reserve all rights not expressly granted to you in and to the Site, the Content and the Marks.</p>
              <h2 className="text-2xl font-bold mt-8">User Representations</h2>
              <p>By using the Site, you represent and warrant that:</p>
              <ul className="list-disc ml-6">
                <li>[(1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary;]</li>
                <li>(3) you have the legal capacity and you agree to comply with these Terms of Service;</li>
                <li>[(4) you are not under the age of 13;]</li>
                <li>(5) not a minor in the jurisdiction in which you reside[or if a minor, you have received parental permission to use the Site];</li>
                <li>(6) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise;</li>
                <li>(7) you will not use the Site for any illegal or unauthorized purpose;</li>
                <li>(8) your use of the Site will not violate any applicable law or regulation.</li>
              </ul>
              <p>If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the Site (or any portion thereof).</p>
              <h2 className="text-2xl font-bold mt-8">User Registration</h2>
              <p>You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</p>
              <h2 className="text-2xl font-bold mt-8">Prohibited Activities</h2>
              <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
              <p>As a user of the Site, you agree not to:</p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                <li>make any unauthorized use of the Site, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under false pretenses.</li>
                <li>use a buying agent or purchasing agent to make purchases on the Site.</li>
                <li>use the Site to advertise or offer to sell goods and services.</li>
                <li>circumvent, disable, or otherwise interfere with security-related features of the Site, including features that prevent or restrict the use or copying of any Content or enforce limitations on the use of the Site and/or the Content contained therein.</li>
                <li>engage in unauthorized framing of or linking to the Site.</li>
                <li>trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords;</li>
                <li>make improper use of our support services or submit false reports of abuse or misconduct.</li>
                <li>engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                <li>interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
                <li>attempt to impersonate another user or person or use the username of another user.</li>
                <li>sell or otherwise transfer your profile.</li>
                <li>use any information obtained from the Site in order to harass, abuse, or harm another person.</li>
                <li>use the Site as part of any effort to compete with us or otherwise use the Site and/or the Content for any revenue-generating endeavor or commercial enterprise.</li>
                <li>decipher, decompile, disassemble, or reverse engineer any of the software comprising or in any way making up a part of the Site.</li>
                <li>attempt to bypass any measures of the Site designed to prevent or restrict access to the Site, or any portion of the Site.</li>
                <li>harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Site to you.</li>
                <li>delete the copyright or other proprietary rights notice from any Content.</li>
                <li>copy or adapt the Site’s software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                <li>upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming (continuous posting of repetitive text), that interferes with any party’s uninterrupted use and enjoyment of the Site or modifies, impairs, disrupts, alters, or interferes with the use, features, functions, operation, or maintenance of the Site.</li>
                <li>upload or transmit (or attempt to upload or to transmit) any material that acts as a passive or active information collection or transmission mechanism, including without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web bugs, cookies, or other similar devices (sometimes referred to as “spyware” or “passive collection mechanisms” or “pcms”).</li>
                <li>except as may be the result of standard search engine or Internet browser usage, use, launch, develop, or distribute any automated system, including without limitation, any spider, robot, cheat utility, scraper, or offline reader that accesses the Site, or using or launching any unauthorized script or other software.</li>
                <li>disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>
                <li>use the Site in a manner inconsistent with any applicable laws or regulations.</li>
              </ol>
              <h2 className="text-2xl font-bold mt-8">User Generated Contributions</h2>
              <p>The Site may invite you to chat, contribute to, or engage in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, “Contributions”).</p>
              <p>Contributions may be viewable by other users of the Site and through third-party websites. Therefore, any Contributions you transmit may be treated in accordance with the Site Privacy Policy. To the extent that the Site Privacy Policy is inconsistent with these Terms of Service, these Terms of Service shall control.</p>
              <p>By providing Contributions through the Site, you grant us a license to use, reproduce, modify, publish, and distribute such Contributions on and through the Site. You represent and warrant that:</p>
              <ul className="list-disc ml-6">
                <li>(1) you own or control all rights in and to the Contributions and have the right to grant this license to us;</li>
                <li>(2) the Contributions are accurate and do not violate any contractual restrictions or other third-party rights;</li>
                <li>(3) the Contributions will not cause injury to any person or entity;</li>
                <li>(4) you are aware that you may be exposed to content that is inaccurate, offensive, indecent, or objectionable, and you agree to waive, and do waive, any legal or equitable rights or remedies you have or may have against us with respect thereto;</li>
                <li>(5) you are aware that your Contributions may be viewed by other users of the Site and through third-party websites and that your Contributions may be publicly distributed outside thereof;</li>
              </ul>
              <p>We have the right, in our sole discretion, to remove or edit Contributions at any time and for any reason, including but not limited to Contributions that violate these Terms of Service.</p>
              <h2 className="text-2xl font-bold mt-8">Third-Party Websites and Content</h2>
              <p>The Site may contain (or you may be sent via the Site) links to other websites (“Third-Party Websites”) as well as articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software, and other content or items belonging to or originating from third parties (collectively, “Third-Party Content”).</p>
              <p>Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us.</p>
              <p>We are not responsible for any Third-Party Websites accessed through the Site or any Third-Party Content posted on or through the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices, or other policies of or contained in the Third-Party Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use or installation of any Third-Party Websites or any Third-Party Content does not imply approval or endorsement thereof by us. If you decide to leave the Site and access the Third-Party Websites or to use or install any Third-Party Content, you do so at your own risk, and you should review and agree to those terms and policies before engaging in any such activity.</p>
              <h2 className="text-2xl font-bold mt-8">Site Management</h2>
              <p>We reserve the right, but not the obligation, to monitor the Site for violations of these Terms of Service and to remove or disable access to any user who violates these Terms of Service or any other user content that we deem inappropriate, at our sole discretion.</p>
              <p>We reserve the right to take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service, including without limitation, reporting such user to law enforcement authorities.</p>
              <p>Without limiting the foregoing, we have the right to cooperate with any law enforcement authorities or court order requesting or directing us to disclose the identity of anyone posting such materials.</p>
              <h2 className="text-2xl font-bold mt-8">Privacy Policy</h2>
              <p>We care about data privacy and security. Please review our Privacy Policy: <a href="/privacy-policy" className="text-blue-600 underline">https://unconfirmed2.github.io/privacy-policy</a>. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Service. Please be advised that the Site is hosted in the United States. If you access the Site from the European Union, Asia, or any other region of the world with laws or regulations governing personal data collection, use, and disclosure that differ from United States laws, then through your continued use of the Site, you are transferring your data to the United States, and you agree to have your data used and disclosed as set forth in these Terms of Service and the Privacy Policy.</p>
              <h2 className="text-2xl font-bold mt-8">Term and Termination</h2>
              <p>These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE TO ANY PERSON FOR ANY REASON OR FOR NO REASON AT ALL, INCLUDING WITHOUT LIMITATION FOR VIOLATION OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.</p>
              <p>We may terminate your use or participation in the Site or delete your account and any content or information that you posted at any time, without warning, in our sole discretion.</p>
              <h2 className="text-2xl font-bold mt-8">Modifications and Interruptions</h2>
              <p>We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update or maintain any information on the Site.</p>
              <p>We reserve the right to interrupt or suspend all or part of the Site or remove any content or information from the Site at any time or for any reason without notice. You agree that we will not be liable to you or any third party for any modification, suspension, or discontinuance of the Site or any part thereof.</p>
              <h2 className="text-2xl font-bold mt-8">Governing Law</h2>
              <p>These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law principles.</p>
              <p>Any legal suit, action, or proceeding arising out of or related to these Terms of Service or the Site shall be instituted exclusively in the federal courts of the United States or the courts of the State of New York, County of New York, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms of Service in your county of residence or any other relevant county.</p>
              <h2 className="text-2xl font-bold mt-8">Dispute Resolution</h2>
              <p>Any dispute, claim, or controversy arising out of or relating to these Terms of Service or the Site, including without limitation any dispute concerning the existence, validity, interpretation, performance, breach, or termination of these Terms of Service (a “Dispute”), shall be resolved by binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules and Mediation Procedures (the “AAA Rules”).</p>
              <p>The arbitration shall be conducted by a single arbitrator appointed in accordance with the AAA Rules. The place of arbitration shall be New York, New York, United States. The language of the arbitration shall be English. The arbitrator shall issue a reasoned award, and any award may be enforced in any court of competent jurisdiction.</p>
              <p>Notwithstanding the foregoing, either party may seek injunctive relief in any court of competent jurisdiction to prevent the unauthorized use or disclosure of its confidential information or intellectual property rights.</p>
              <h2 className="text-2xl font-bold mt-8">Limitation of Liability</h2>
              <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE, OUR AFFILIATES, OR OUR LICENSORS BE LIABLE FOR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOST PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THESE TERMS OF SERVICE OR YOUR USE OF, OR INABILITY TO USE, THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.</p>
              <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THESE TERMS OF SERVICE OR YOUR USE OF THE SITE SHALL NOT EXCEED THE GREATER OF ONE HUNDRED DOLLARS ($100) OR THE AMOUNTS PAID BY YOU, IF ANY, TO US DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE DATE OF THE CLAIM.</p>
              <h2 className="text-2xl font-bold mt-8">Indemnification</h2>
              <p>You agree to defend, indemnify, and hold harmless us, our affiliates, licensors, and service providers, and our and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Service or your use of the Site, including, but not limited to, your Contributions, any use of the Site's content, services, and products other than as expressly authorized in these Terms of Service, or your use of any information obtained from the Site.</p>
              <h2 className="text-2xl font-bold mt-8">Miscellaneous</h2>
              <p>These Terms of Service, together with our Privacy Policy and any other legal notices or agreements published by us on the Site, constitute the entire agreement between you and us concerning your use of the Site. If any provision of these Terms of Service is deemed invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</p>
              <p>No waiver of any term or condition of these Terms of Service shall be deemed a further or continuing waiver of such term or any other term, and any failure of us to assert a right or provision under these Terms of Service shall not constitute a waiver of such right or provision.</p>
              <p>We reserve the right to assign or transfer these Terms of Service, in whole or in part, at any time without notice to you. You may not assign or transfer these Terms of Service or any of your rights or obligations hereunder, in whole or in part, without our prior written consent.</p>
              <p>Headings are for reference purposes only and do not constitute a part of these Terms of Service.</p>
              <p>Contact Us</p>
              <p>If you have any questions about these Terms of Service, please contact us:</p>
              <ul className="list-disc ml-6">
                <li>By email: <a href="mailto:support@digitalvagabond.ing" className="text-blue-600 underline">support@digitalvagabond.ing</a></li>
                <li>By visiting this page on our website: <a href="https://unconfirmed2.github.io/privacy" className="text-blue-600 underline">https://unconfirmed2.github.io/privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AnalyticsAndConsent />
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed bottom-0 left-0 z-40 text-xs md:text-base">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative h-full">
          <div className="flex-shrink-0 flex items-center w-full md:w-auto justify-center md:justify-start mb-1 md:mb-0">
            <DonateButton />
          </div>
          <div className="flex-1 text-center text-gray-700 text-xs md:text-base font-medium">
            Connecting travelers worldwide through community groups
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end mt-1 md:mt-0 text-xs text-gray-400">
            <Link to="/terms-of-service" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a href="/sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
