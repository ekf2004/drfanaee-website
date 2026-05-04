import { useState, useEffect } from "react";

// Headshot images (base64 encoded)
const IMG_ERIC = "/images/eric.jpg";
const IMG_KONG = "/images/kong.jpg";
const IMG_MARY = "/images/mary.jpg";
const IMG_TOM = "/images/tom.jpg";
const IMG_LISA = "/images/lisa.jpg";
const IMG_CONSULT = "/images/consult.jpg";
const IMG_PROCEDURE = "/images/procedure.jpg";


const PHONE = "631-265-2020";
const FAX = "631-482-8766";
const SITE_URL = "https://www.drfanaee.com";

const PROVIDERS = [
  { name: "Eric Fanaee, MD", role: "Medical Director", credentials: "Board Certified in Pain Medicine & Anesthesiology", initials: "EF", color: "#1e3a5f", bio: "Residency trained in Anesthesiology at the University of Chicago and fellowship trained in Pain Medicine at NYU Langone Medical Center, Dr. Fanaee has been serving Long Island since 2013 and is board certified in both Pain Medicine and Anesthesiology. He founded Long Island Brain & Spine with a mission to provide advanced interventional pain management that reduces pain, restores function, and improves quality of life. He offers sedation for all interventional procedures.", featured: true },
  { name: "Clarence Kong, MD", role: "Assoc. Director, Interventional Spine & Pain Management", credentials: "Board Certified", initials: "CK", img: IMG_KONG, color: "#1e3a5f", bio: "Dr. Kong specializes in interventional spine procedures and pain management, bringing expertise in advanced minimally invasive techniques for chronic spinal conditions." },
  { name: "Mary Milano Carter, MS, ANP-BC, AP-PMN, PMGT-BC, GERO-BC", role: "Board Certified Nurse Practitioner", credentials: "Pain Management & Geriatrics Certified", initials: "MC", img: IMG_MARY, color: "#2d6a8a", bio: "With 28 years of experience in chronic pain management, Mary holds board certifications in adult practice, pain management, and geriatrics. She develops individualized treatment plans for complex pain conditions." },
  { name: "Thomas Yarrobino, FNP, DPT", role: "Nurse Practitioner & Doctor of Physical Therapy", credentials: "Musculoskeletal Specialist", initials: "TY", img: IMG_TOM, color: "#1e3a5f", bio: "Tom brings a unique dual perspective as both a nurse practitioner and physical therapist, specializing in musculoskeletal care including ultrasound-guided joint injections, trigger point therapy, PRP therapy, and individualized rehabilitation." },
  { name: "Lisa Persico, PA-C, MPAS", role: "Physician Assistant", credentials: "Pain Management & Neurosurgery", initials: "LP", img: IMG_LISA, color: "#2d6a8a", bio: "Lisa is a dedicated patient advocate with a Master's in Physician Assistant Studies. She brings focused experience in chronic pain management and neurosurgery, developing personalized treatment plans that enhance quality of life." },
];

const LOCATIONS = [
  { name: "West Islip", address: "380 Montauk Highway", city: "West Islip, NY 11795", phone: PHONE, hours: "Mon–Fri: 8:00 AM – 5:00 PM", lat: 40.7062, lng: -73.3068, nearby: "Serving West Islip, Bay Shore, Babylon, Islip, Brightwaters, and the South Shore" },
  { name: "Smithtown", address: "48 NY-25A, Suite 302", city: "Smithtown, NY 11787", phone: PHONE, hours: "Mon–Fri: 8:00 AM – 5:00 PM", lat: 40.8557, lng: -73.2007, nearby: "Serving Smithtown, Hauppauge, Commack, Kings Park, St. James, and the North Shore" },
  { name: "Bellmore", address: "250 Pettit Avenue, Suite 03", city: "Bellmore, NY 11710", phone: PHONE, hours: "Mon–Fri: 8:00 AM – 5:00 PM", lat: 40.6687, lng: -73.5271, nearby: "Serving Bellmore, Merrick, Wantagh, Seaford, Massapequa, and Nassau County" },
];

const CONDITIONS = [
  { name: "Back Pain", icon: "🦴", desc: "Chronic and acute lower back pain, lumbar disc disease, and spinal stenosis" },
  { name: "Neck Pain", icon: "🔄", desc: "Cervical disc herniation, whiplash, cervical radiculopathy" },
  { name: "Sciatica", icon: "⚡", desc: "Radiating leg pain from compressed lumbar nerve roots" },
  { name: "Joint Pain", icon: "🦵", desc: "Knee, hip, shoulder, and sacroiliac joint conditions" },
  { name: "Neuropathy", icon: "🔬", desc: "Peripheral neuropathy, diabetic nerve pain, nerve damage" },
  { name: "Herniated Disc", icon: "💠", desc: "Cervical and lumbar disc herniations causing nerve compression" },
  { name: "Arthritis Pain", icon: "🫱", desc: "Osteoarthritis, degenerative joint disease, inflammatory conditions" },
  { name: "Migraines & Headaches", icon: "🧠", desc: "Chronic migraines, occipital neuralgia, cervicogenic headaches" },
  { name: "Sports Injuries", icon: "🏃", desc: "Ligament sprains, muscle tears, overuse injuries" },
  { name: "Post-Surgical Pain", icon: "🩹", desc: "Persistent pain following spine, joint, or other surgeries" },
  { name: "Complex Regional Pain", icon: "🔥", desc: "CRPS Type I and II with advanced neuromodulation options" },
  { name: "Compression Fractures", icon: "🦷", desc: "Vertebral compression fractures treated with kyphoplasty" },
];

const TREATMENTS = [
  { name: "Epidural Steroid Injections", desc: "Targeted delivery of anti-inflammatory medication to reduce spinal nerve inflammation and relieve pain from herniated discs, spinal stenosis, and sciatica." },
  { name: "Radiofrequency Ablation (RFA)", desc: "Uses heat energy to disrupt pain nerve signal transmission, providing long-lasting relief for chronic neck, back, and joint pain lasting 6–18 months." },
  { name: "Spinal Cord Stimulation", desc: "Advanced neuromodulation using a small implanted device that sends electrical impulses to interrupt pain signals before they reach the brain." },
  { name: "Intracept® Procedure", desc: "FDA-cleared minimally invasive treatment targeting the basivertebral nerve for chronic vertebrogenic low back pain unresponsive to conservative care." },
  { name: "Kyphoplasty", desc: "Minimally invasive treatment that stabilizes vertebral compression fractures and restores vertebral height using bone cement." },
  { name: "Nerve Blocks", desc: "Ultrasound and fluoroscopy-guided precision injections to block pain signals from specific nerves. Includes stellate ganglion, intercostal, and peripheral nerve blocks." },
  { name: "PRP Therapy", desc: "Platelet-rich plasma injections using your body's own growth factors to promote natural tissue healing for joint, tendon, and ligament injuries." },
  { name: "Joint & Bursa Injections", desc: "Ultrasound-guided injections for shoulder, hip, knee, SI joint, and bursa pain using corticosteroids or hyaluronic acid." },
  { name: "Trigger Point Injections", desc: "Targeted treatment for painful muscle knots and myofascial trigger points commonly found in the neck, shoulders, and back." },
  { name: "Chronic Pain Management", desc: "Comprehensive multimodal approach combining interventional procedures, medication management, and rehabilitation for long-term pain control." },
];

const FAQS = [
  { q: "What is interventional pain management?", a: "Interventional pain management uses minimally invasive procedures — such as epidural steroid injections, nerve blocks, and radiofrequency ablation — to target the specific source of your pain rather than relying solely on medication. These procedures are performed using image guidance (fluoroscopy or ultrasound) for precision and safety." },
  { q: "Do you offer sedation for procedures?", a: "Yes. Dr. Fanaee offers sedation for all interventional pain procedures. As a board-certified anesthesiologist, he can safely provide sedation to ensure your comfort during any treatment." },
  { q: "Do I need a referral to see a pain management doctor?", a: "Most insurance plans do not require a referral to see a pain management specialist. However, some HMO plans may require one. Our office can verify your insurance coverage and referral requirements when you call to schedule." },
  { q: "What should I expect at my first visit?", a: "Your first visit includes a thorough evaluation of your pain history, physical examination, and review of any imaging (MRI, X-ray, CT scan). Dr. Fanaee or one of our providers will discuss all available treatment options and develop a personalized care plan. Please bring your insurance card, photo ID, and any relevant medical records or imaging." },
  { q: "How long do procedures take?", a: "Most interventional procedures take just 5–10 minutes. With check-in, preparation, and recovery, plan for approximately 1–2 hours total. You will need someone to drive you home if sedation is used." },
  { q: "What insurance plans do you accept?", a: "We accept most major insurance plans including Medicare, Aetna, Blue Cross Blue Shield, Cigna, United Healthcare, Oxford, and many others. Contact our office to verify your specific plan." },
  { q: "What areas of Long Island do you serve?", a: "We have three convenient office locations serving all of Long Island: West Islip (South Shore), Smithtown (North Shore/Suffolk County), and Bellmore (Nassau County). Procedures are performed at Good Samaritan Hospital in West Islip as well as our office-based surgical practice, which offers a more convenient and personalized experience for patients who prefer an alternative to a hospital setting." },
  { q: "What is radiofrequency ablation and how long does it last?", a: "Radiofrequency ablation (RFA) uses controlled heat energy to disrupt the nerves that are transmitting pain signals. The procedure typically provides relief lasting 6 to 18 months. When pain returns, the procedure can be safely repeated." },
  { q: "Do you accept workers' compensation and no-fault insurance?", a: "Yes. We treat patients with workers' compensation and no-fault (motor vehicle accident) insurance at all three of our Long Island locations. Our team handles the authorization process and required documentation." },
  { q: "Who is the best pain management doctor on Long Island?", a: "Dr. Eric Fanaee is a board-certified pain management specialist with fellowship training at NYU Langone Medical Center and residency training at the University of Chicago. With a 4.9-star rating across 634+ Google reviews and three convenient Long Island locations, Dr. Fanaee and his team provide advanced interventional pain management with sedation offered for all procedures. He has been serving Long Island since 2013." },
  { q: "Do you offer same-day or next-day appointments?", a: "We make every effort to see patients as quickly as possible. Same-day and next-day appointments are often available depending on the location and provider schedule. Call our office at 631-265-2020 or submit an online appointment request for the fastest response." },
];

const BLOG_POSTS = [

  // ===== WEEK 1: May 5, 2026 =====
  {
    slug: "what-to-expect-first-pain-management-visit",
    title: "What to Expect at Your First Pain Management Appointment",
    publishDate: "2026-05-05",
    date: "May 5, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Patient Education",
    excerpt: "Your first visit to a pain management specialist can feel intimidating. Here's exactly what happens during your initial consultation and how to prepare.",
    content: [
      { type: "p", text: "If you've been referred to a pain management specialist — or you've decided on your own that it's time to get help for chronic pain — you might be wondering what the first appointment looks like. Many patients tell us they wish they had come sooner. Here's what to expect." },
      { type: "h2", text: "Before Your Visit" },
      { type: "p", text: "Gather your medical records, including any MRI, X-ray, or CT scan results. If your imaging was done at a hospital or imaging center, request that a CD or digital copy be sent to our office ahead of your appointment. Also prepare a list of your current medications, including dosages, and any prior treatments you've tried for your pain." },
      { type: "h2", text: "What to Bring" },
      { type: "p", text: "Please bring your insurance card, a valid photo ID, and a list of your current medications. If you have any imaging studies on CD, bring those as well. Arriving 15 minutes early allows time for paperwork." },
      { type: "h2", text: "The Evaluation" },
      { type: "p", text: "Your provider will conduct a thorough evaluation that includes a detailed history of your pain — when it started, what makes it better or worse, how it affects your daily life, and what treatments you've already tried. A focused physical examination follows, which may include testing your range of motion, reflexes, and sensation." },
      { type: "h2", text: "Reviewing Your Imaging" },
      { type: "p", text: "Dr. Fanaee or your provider will review your MRI, X-ray, or CT scan with you, explaining what the imaging shows and how it correlates with your symptoms. This is an important step — many patients have never had their imaging explained to them in detail." },
      { type: "h2", text: "Your Treatment Plan" },
      { type: "p", text: "Based on the evaluation, your provider will discuss all available treatment options. This might include interventional procedures like epidural steroid injections or radiofrequency ablation, medication adjustments, physical therapy recommendations, or a combination approach. Every plan is individualized — there's no one-size-fits-all in pain management." },
      { type: "h2", text: "Common Questions Patients Ask" },
      { type: "p", text: "Will I need a procedure on my first visit? Typically no — the first visit is focused on evaluation and treatment planning. Will you prescribe pain medication? We take a non-opioid-first approach, focusing on interventional treatments that address the source of pain. How many visits will I need? This depends on your condition and treatment plan, which we'll discuss together." },
      { type: "p", text: "The most important thing is to come ready to be an active participant in your care. The more information you can share about your pain, the better we can help you." },
    ]
  },

  // ===== WEEK 2: May 12, 2026 =====
  {
    slug: "epidural-injection-vs-surgery-back-pain",
    title: "Epidural Injections vs. Surgery for Back Pain: What You Need to Know",
    publishDate: "2026-05-12",
    date: "May 12, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Treatment Options",
    excerpt: "Many patients with herniated discs and sciatica wonder whether they need surgery. In most cases, interventional treatments like epidural steroid injections provide significant relief without the operating room.",
    content: [
      { type: "p", text: "When you're dealing with severe back pain or sciatica, it's natural to wonder: do I need surgery? The short answer for most patients is no. Advances in interventional pain management now provide effective alternatives that can resolve symptoms without the risks, recovery time, and cost of spinal surgery." },
      { type: "h2", text: "When Surgery Is NOT the First Option" },
      { type: "p", text: "The majority of herniated discs, bulging discs, and cases of spinal stenosis can be treated conservatively. Current medical guidelines recommend exhausting non-surgical options before considering surgery. Epidural steroid injections are one of the most effective non-surgical treatments available, with studies showing significant pain reduction in the majority of properly selected patients." },
      { type: "h2", text: "How Epidural Steroid Injections Work" },
      { type: "p", text: "An epidural injection delivers a powerful anti-inflammatory steroid directly to the inflamed nerve root in your spine. Using real-time fluoroscopic (X-ray) guidance, the medication is placed precisely where the inflammation is occurring. The procedure takes approximately 5-10 minutes and is performed on an outpatient basis. At our practice, sedation is available for all procedures to ensure your comfort." },
      { type: "h2", text: "When Surgery Makes Sense" },
      { type: "p", text: "Surgery is typically recommended when there are neurological deficits such as progressive weakness or loss of bladder or bowel function, when conservative treatments have failed after an adequate trial period, or when there is structural instability in the spine. Dr. Fanaee works closely with neurosurgeons and orthopedic spine surgeons to ensure patients who do need surgery are referred appropriately." },
      { type: "h2", text: "The Bottom Line" },
      { type: "p", text: "Most patients with back pain and sciatica should explore non-surgical options first. A consultation with a pain management specialist can help you understand all of your options and make an informed decision about your care." },
    ]
  },

  // ===== WEEK 3: May 19, 2026 =====
  {
    slug: "understanding-sciatica-causes-treatment",
    title: "Understanding Sciatica: Causes, Symptoms, and Treatment Options",
    publishDate: "2026-05-19",
    date: "May 19, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Conditions",
    excerpt: "Sciatica affects millions of Americans every year. Learn what causes that shooting pain down your leg and the most effective treatments available today.",
    content: [
      { type: "p", text: "If you've ever felt a sharp, shooting pain radiating from your lower back down through your buttock and into your leg, you've likely experienced sciatica. It's one of the most common reasons patients visit a pain management specialist, and effective treatments are available." },
      { type: "h2", text: "What Is Sciatica?" },
      { type: "p", text: "Sciatica refers to pain that travels along the path of the sciatic nerve — the longest nerve in your body, running from your lower back through your hips and down each leg. The pain is usually caused by compression or irritation of a nerve root in the lumbar spine, most commonly from a herniated disc or spinal stenosis." },
      { type: "h2", text: "Common Causes" },
      { type: "p", text: "The most frequent causes include herniated or bulging lumbar discs, lumbar spinal stenosis, degenerative disc disease, and spondylolisthesis. Less commonly, sciatica can be caused by piriformis syndrome, where the piriformis muscle in the buttock compresses the sciatic nerve." },
      { type: "h2", text: "When to See a Specialist" },
      { type: "p", text: "You should see a pain management specialist if your pain lasts more than a few weeks, is severe enough to interfere with daily activities, is accompanied by weakness or numbness in your leg, or if you experience changes in bladder or bowel function, which requires immediate medical attention." },
      { type: "h2", text: "Treatment Options" },
      { type: "p", text: "At Long Island Brain and Spine, we treat sciatica using a step-by-step approach. For many patients, epidural steroid injections provide significant relief by reducing inflammation around the compressed nerve root. The procedure takes just 5-10 minutes, and sedation is available. For patients who don't respond to injections, additional options include transforaminal epidural injections, spinal cord stimulation, or referral for surgical evaluation." },
      { type: "h2", text: "Recovery and Prevention" },
      { type: "p", text: "Most patients with sciatica improve significantly with appropriate treatment. Physical therapy plays an important role in recovery, focusing on core strengthening, flexibility, and proper body mechanics." },
    ]
  },

  // ===== WEEK 4: May 26, 2026 =====
  {
    slug: "radiofrequency-ablation-long-lasting-relief",
    title: "Radiofrequency Ablation: The Treatment That Provides Months of Pain Relief",
    publishDate: "2026-05-26",
    date: "May 26, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Procedures",
    excerpt: "If nerve blocks helped but the pain keeps coming back, radiofrequency ablation may be the answer. Here's how this procedure provides 6-18 months of relief.",
    content: [
      { type: "p", text: "One of the most common frustrations patients share is: the nerve block helped, but the relief didn't last. If this sounds familiar, radiofrequency ablation (RFA) may be the answer you've been looking for." },
      { type: "h2", text: "What Is Radiofrequency Ablation?" },
      { type: "p", text: "RFA is a minimally invasive procedure that uses controlled heat energy to disable the specific nerves responsible for transmitting your pain signals. Think of it as a longer-lasting version of a nerve block — instead of temporarily numbing the nerve, RFA disrupts it for months at a time." },
      { type: "h2", text: "How Long Does Relief Last?" },
      { type: "p", text: "Most patients experience pain relief lasting 6 to 18 months. The treated nerves do eventually regenerate, but when pain returns, the procedure can be safely repeated with similar results. Many of our patients undergo RFA once or twice a year and maintain excellent quality of life." },
      { type: "h2", text: "The Two-Step Process" },
      { type: "p", text: "Before performing RFA, we always do a diagnostic test first — a medial branch block. This small injection temporarily blocks the same nerves we would treat with RFA. If the block provides significant relief, confirming those nerves are the pain source, we proceed with the ablation. This two-step approach ensures we're treating the right target." },
      { type: "h2", text: "What to Expect" },
      { type: "p", text: "RFA takes approximately 5-10 minutes per level treated and is performed under fluoroscopic guidance. Sedation is offered for all procedures. Most patients go home the same day and return to normal activities within a few days." },
    ]
  },

  // ===== WEEK 5: June 2, 2026 =====
  {
    slug: "workers-compensation-pain-management-long-island",
    title: "Injured at Work? What to Know About Workers' Compensation and Pain Management",
    publishDate: "2026-06-02",
    date: "June 2, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Insurance & Access",
    excerpt: "If you've been injured on the job, you have the right to see a pain management specialist. Here's how workers' compensation works with interventional pain management.",
    content: [
      { type: "p", text: "Workplace injuries often result in chronic pain that requires specialized treatment. Many injured workers don't realize they can see a pain management specialist under their workers' compensation coverage." },
      { type: "h2", text: "Your Right to Choose" },
      { type: "p", text: "In New York State, injured workers have the right to choose their treating physician, including a pain management specialist. You do not need your employer's permission to schedule an appointment." },
      { type: "h2", text: "What We Treat Under Workers' Comp" },
      { type: "p", text: "Common work-related injuries we treat include back injuries from lifting, neck injuries from falls or motor vehicle accidents during work, repetitive strain injuries, and post-surgical pain from work-related surgeries." },
      { type: "h2", text: "Treatments Available" },
      { type: "p", text: "All of our interventional services are available to workers' compensation patients, including epidural steroid injections, radiofrequency ablation, nerve blocks, joint injections, and more. Treatment follows the New York State Medical Treatment Guidelines." },
      { type: "h2", text: "How Our Office Handles Workers' Comp" },
      { type: "p", text: "We accept workers' compensation at all three Long Island locations — West Islip, Smithtown, and Bellmore. Our experienced staff manages the authorization process and handles all required paperwork so you can focus on getting better." },
    ]
  },

  // ===== WEEK 6: June 9, 2026 =====
  {
    slug: "spinal-cord-stimulation-chronic-pain",
    title: "Spinal Cord Stimulation: Is It Right for You?",
    publishDate: "2026-06-09",
    date: "June 9, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Procedures",
    excerpt: "For patients with chronic pain who haven't found relief from other treatments, spinal cord stimulation offers a life-changing option. Here's how the trial-first approach works.",
    content: [
      { type: "p", text: "When other treatments haven't provided adequate relief for chronic pain, spinal cord stimulation (SCS) may offer a solution. This advanced therapy has helped thousands of patients reduce their pain and return to active lives — and the best part is, you get to try it before committing." },
      { type: "h2", text: "How Spinal Cord Stimulation Works" },
      { type: "p", text: "SCS uses a small implanted device to send mild electrical impulses to the spinal cord, interrupting pain signals before they reach the brain. Modern systems can provide relief without any tingling sensation, and settings can be adjusted with a handheld controller." },
      { type: "h2", text: "The Trial Period" },
      { type: "p", text: "What makes SCS unique is the trial-first approach. Before any permanent implantation, temporary leads are placed during a brief outpatient procedure. You then live with the system for 5-7 days, testing it during your normal daily activities. If you experience 50% or greater pain reduction, a permanent system is implanted." },
      { type: "h2", text: "Who Is a Candidate?" },
      { type: "p", text: "SCS is typically recommended for patients with failed back surgery syndrome, complex regional pain syndrome (CRPS), chronic radiculopathy, or peripheral neuropathy who haven't responded adequately to other treatments." },
      { type: "h2", text: "Modern Technology" },
      { type: "p", text: "Today's SCS devices are MRI-compatible, rechargeable, and significantly smaller than previous generations. Options include traditional stimulation, high-frequency (HF10) stimulation, burst stimulation, and dorsal root ganglion (DRG) stimulation. Dr. Fanaee helps determine which technology is best suited for your specific condition." },
      { type: "h2", text: "Insurance Coverage" },
      { type: "p", text: "Most major insurance plans, including Medicare, cover spinal cord stimulation when medically necessary. Our office handles pre-authorization and works directly with your insurance provider." },
    ]
  },

  // ===== WEEK 7: June 16, 2026 =====
  {
    slug: "neck-pain-causes-when-to-see-specialist",
    title: "Neck Pain: Common Causes and When to See a Pain Management Specialist",
    publishDate: "2026-06-16",
    date: "June 16, 2026",
    author: "Dr. Clarence Kong",
    readTime: "4 min read",
    category: "Conditions",
    excerpt: "Neck pain affects nearly everyone at some point. Learn the difference between everyday stiffness and pain that needs professional evaluation.",
    content: [
      { type: "p", text: "Neck pain is one of the most common complaints we see at Long Island Brain and Spine. While occasional neck stiffness from poor posture or sleeping awkwardly usually resolves on its own, persistent or severe neck pain may indicate a condition that benefits from specialized treatment." },
      { type: "h2", text: "Common Causes of Neck Pain" },
      { type: "p", text: "Cervical disc herniation occurs when a disc in the neck bulges or ruptures, pressing on nearby nerves. This can cause pain that radiates into the shoulder, arm, and hand. Cervical spondylosis, or age-related wear on spinal discs and joints, is another frequent cause. Cervical spinal stenosis — narrowing of the spinal canal in the neck — can compress the spinal cord and nerve roots." },
      { type: "h2", text: "Red Flags: When to See a Specialist" },
      { type: "p", text: "Seek evaluation if your neck pain lasts more than a few weeks, radiates into your arms or hands, is accompanied by numbness, tingling, or weakness, was caused by trauma such as a car accident or fall, or is associated with headaches that don't respond to over-the-counter medication." },
      { type: "h2", text: "Treatment Options" },
      { type: "p", text: "Cervical epidural steroid injections can reduce inflammation around compressed nerve roots. Cervical radiofrequency ablation provides longer-lasting relief for facet-mediated neck pain. Occipital nerve blocks effectively treat cervicogenic headaches. All procedures are performed with fluoroscopic or ultrasound guidance and sedation is available." },
      { type: "h2", text: "Prevention" },
      { type: "p", text: "Maintaining good posture, taking breaks from screen time, keeping your monitor at eye level, using a supportive pillow, and regular neck stretching can help prevent recurrent neck pain." },
    ]
  },

  // ===== WEEK 8: June 23, 2026 =====
  {
    slug: "intracept-procedure-chronic-low-back-pain",
    title: "The Intracept Procedure: A Breakthrough for Chronic Low Back Pain",
    publishDate: "2026-06-23",
    date: "June 23, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Procedures",
    excerpt: "If you have chronic low back pain with Modic changes on MRI and haven't found relief from injections, the Intracept procedure may target the source of your pain.",
    content: [
      { type: "p", text: "For years, a specific type of chronic low back pain had no good treatment option. Patients with vertebrogenic pain — pain originating from within the vertebral bones themselves — often went through rounds of injections, physical therapy, and medication with limited success. The Intracept procedure has changed that." },
      { type: "h2", text: "What Is Vertebrogenic Pain?" },
      { type: "p", text: "Inside each vertebral body is a nerve called the basivertebral nerve (BVN). When the vertebral endplates are damaged — visible as Modic changes on MRI — this nerve becomes a significant source of chronic low back pain. Traditional treatments like epidural injections target the nerves outside the vertebral body and may miss this internal pain source entirely." },
      { type: "h2", text: "How Intracept Works" },
      { type: "p", text: "The Intracept procedure uses radiofrequency energy delivered through a specialized curved probe to ablate the basivertebral nerve. The probe is advanced through the pedicle of the vertebra to reach the nerve at the center of the vertebral body. By permanently disrupting this nerve, the procedure eliminates the source of vertebrogenic pain." },
      { type: "h2", text: "The Evidence" },
      { type: "p", text: "Intracept is backed by Level I evidence from randomized controlled trials. Long-term data shows sustained pain relief at 5 or more years following the procedure. It is FDA-cleared and increasingly covered by major insurance plans, including Medicare." },
      { type: "h2", text: "Am I a Candidate?" },
      { type: "p", text: "You may be a candidate if you have chronic low back pain lasting 6 or more months, Modic Type 1 or Type 2 changes visible on MRI, and haven't found adequate relief from conservative treatments. Dr. Fanaee evaluates your MRI and clinical history to determine if Intracept is appropriate for your specific condition." },
      { type: "h2", text: "What Makes It Different" },
      { type: "p", text: "Unlike spinal fusion, Intracept preserves spinal mobility. Unlike epidural injections, it targets a previously unreachable pain source. And unlike ongoing medication, it's a single procedure with durable, long-term results." },
    ]
  },

  // ===== WEEK 9: June 30, 2026 =====
  {
    slug: "si-joint-pain-diagnosis-treatment",
    title: "Sacroiliac Joint Pain: The Overlooked Cause of Lower Back Pain",
    publishDate: "2026-06-30",
    date: "June 30, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Conditions",
    excerpt: "Up to 30% of chronic lower back pain originates from the sacroiliac joint. Here's how to identify it and the treatment options available.",
    content: [
      { type: "p", text: "If you have lower back pain that's concentrated on one side, worsens when standing from a seated position, and radiates into your buttock or upper thigh, the sacroiliac (SI) joint may be the culprit. SI joint dysfunction is one of the most commonly overlooked causes of low back pain." },
      { type: "h2", text: "What Is the Sacroiliac Joint?" },
      { type: "p", text: "The SI joints connect your spine to your pelvis — one on each side. These joints absorb shock between your upper body and legs. When they become inflamed or dysfunctional due to arthritis, injury, pregnancy, or abnormal movement patterns, they can cause significant pain." },
      { type: "h2", text: "How Is SI Joint Pain Diagnosed?" },
      { type: "p", text: "Diagnosis involves a combination of physical examination with specific provocation tests and a diagnostic SI joint injection. If injecting local anesthetic into the SI joint under fluoroscopic guidance significantly reduces your pain, it confirms the SI joint as the pain source." },
      { type: "h2", text: "Treatment Options" },
      { type: "p", text: "SI joint steroid injections provide relief by reducing inflammation within the joint. For longer-lasting results, radiofrequency ablation of the nerves supplying the SI joint can provide 6-18 months of relief. Physical therapy focusing on pelvic stabilization exercises complements interventional treatments." },
    ]
  },

  // ===== WEEK 10: July 7, 2026 =====
  {
    slug: "knee-pain-non-surgical-treatment",
    title: "Knee Pain Without Surgery: Injection Options for Osteoarthritis",
    publishDate: "2026-07-07",
    date: "July 7, 2026",
    author: "Thomas Yarrobino, FNP, DPT",
    readTime: "4 min read",
    category: "Treatment Options",
    excerpt: "Not ready for knee replacement? Ultrasound-guided knee injections can reduce pain, improve mobility, and delay or prevent surgery.",
    content: [
      { type: "p", text: "Knee osteoarthritis affects millions of Americans, and many patients assume that knee replacement surgery is their only option when the pain becomes severe. But today's injection therapies offer effective alternatives that can significantly reduce pain and improve function — without surgery." },
      { type: "h2", text: "Corticosteroid Injections" },
      { type: "p", text: "A corticosteroid injection delivers a powerful anti-inflammatory medication directly into the knee joint. Using ultrasound guidance, we ensure the medication reaches the joint space precisely. Relief typically begins within days and can last 1-3 months. This is an excellent option for acute flare-ups." },
      { type: "h2", text: "Hyaluronic Acid Injections (Viscosupplementation)" },
      { type: "p", text: "Hyaluronic acid is a naturally occurring substance in joint fluid that provides lubrication and cushioning. In osteoarthritis, this natural lubricant breaks down. Viscosupplementation replaces it, reducing friction and pain. A series of injections can provide relief lasting 6 months or longer." },
      { type: "h2", text: "PRP Therapy for Knee Pain" },
      { type: "p", text: "Platelet-rich plasma (PRP) therapy uses your own blood's growth factors to promote healing within the joint. Research has shown promising results for knee osteoarthritis, with some patients experiencing improvement lasting a year or more." },
      { type: "h2", text: "Genicular Nerve Block and Ablation" },
      { type: "p", text: "For patients who want longer-lasting relief, genicular nerve blocks and radiofrequency ablation target the nerves that transmit pain from the knee joint. This can provide months of relief without affecting knee function or mobility." },
      { type: "h2", text: "Why Ultrasound Guidance Matters" },
      { type: "p", text: "All of our knee injections are performed under ultrasound guidance. Studies show that ultrasound-guided injections are significantly more accurate than blind injections, meaning more medication reaches the joint and less is wasted in surrounding tissue. Better accuracy means better results." },
    ]
  },

  // ===== WEEK 11: July 14, 2026 =====
  {
    slug: "car-accident-pain-no-fault-insurance",
    title: "Pain After a Car Accident? What You Need to Know About No-Fault Insurance",
    publishDate: "2026-07-14",
    date: "July 14, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Insurance & Access",
    excerpt: "If you've been in a motor vehicle accident in New York, your no-fault insurance covers pain management treatment. Here's how the process works.",
    content: [
      { type: "p", text: "Motor vehicle accidents are a leading cause of chronic neck and back pain. Whiplash, disc herniations, and soft tissue injuries from car accidents can cause symptoms that persist for months or years if not properly treated. The good news: New York's no-fault insurance covers your treatment." },
      { type: "h2", text: "What Is No-Fault Insurance?" },
      { type: "p", text: "In New York State, no-fault insurance (also called Personal Injury Protection or PIP) covers medical expenses from a motor vehicle accident regardless of who was at fault. This includes pain management treatment, diagnostic imaging, physical therapy, and interventional procedures." },
      { type: "h2", text: "Common Injuries We Treat" },
      { type: "p", text: "Whiplash and cervical strain, cervical and lumbar disc herniations, radiculopathy from nerve compression, shoulder injuries from seatbelt restraint, headaches including post-traumatic and cervicogenic types, and chronic pain from soft tissue injuries." },
      { type: "h2", text: "Time Is Important" },
      { type: "p", text: "New York no-fault insurance requires that you seek medical attention within 30 days of the accident. Even if your pain seems minor initially, getting evaluated early establishes a medical record and ensures coverage for future treatment if symptoms worsen." },
      { type: "h2", text: "Getting Started" },
      { type: "p", text: "We accept no-fault insurance at all three Long Island locations. Bring your insurance claim number and the other driver's insurance information to your first visit. Our staff handles the authorization process and required documentation." },
    ]
  },

  // ===== WEEK 12: July 21, 2026 =====
  {
    slug: "failed-back-surgery-syndrome-options",
    title: "Still in Pain After Back Surgery? You Have Options",
    publishDate: "2026-07-21",
    date: "July 21, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Conditions",
    excerpt: "Failed back surgery syndrome affects up to 40% of spinal surgery patients. Advanced pain management treatments can provide the relief surgery didn't.",
    content: [
      { type: "p", text: "You had back surgery expecting to feel better. But weeks or months later, the pain is still there — or it's even worse. If this is your experience, you're not alone. Failed back surgery syndrome (FBSS) affects a significant percentage of spinal surgery patients, and it doesn't mean you're out of options." },
      { type: "h2", text: "What Is Failed Back Surgery Syndrome?" },
      { type: "p", text: "FBSS is a general term used when spinal surgery doesn't result in the expected pain relief. It doesn't necessarily mean the surgery was performed incorrectly — there are many reasons surgery may not fully resolve pain, including scar tissue formation around nerves, adjacent segment disease, residual nerve compression, or the original pain source being different from what was surgically addressed." },
      { type: "h2", text: "Treatment Options" },
      { type: "p", text: "Spinal cord stimulation is one of the most effective treatments for FBSS, with studies showing significant pain relief in a majority of properly selected patients. Epidural steroid injections can address inflammation from scar tissue. Radiofrequency ablation may help if facet joints are contributing to pain. A comprehensive, multimodal approach combining interventional procedures with physical therapy and medication management often provides the best results." },
      { type: "h2", text: "The Spinal Cord Stimulation Advantage" },
      { type: "p", text: "SCS is particularly well-suited for FBSS because it doesn't require additional surgery on the spine itself. The trial period lets you experience the therapy before committing. And modern SCS technology offers multiple stimulation patterns to find what works best for your specific pain pattern." },
      { type: "h2", text: "Don't Give Up" },
      { type: "p", text: "FBSS can feel discouraging, but advanced pain management techniques continue to evolve. A consultation with a pain management specialist who has experience treating post-surgical patients can help you explore all available options." },
    ]
  },

  // ===== WEEK 13: July 28, 2026 =====
  {
    slug: "migraine-headache-pain-management-treatment",
    title: "Chronic Migraines and Headaches: How Pain Management Can Help",
    publishDate: "2026-07-28",
    date: "July 28, 2026",
    author: "Mary Milano Carter, NP",
    readTime: "4 min read",
    category: "Conditions",
    excerpt: "If you suffer from chronic migraines or headaches that don't respond to medication, interventional pain management offers treatments that target the source.",
    content: [
      { type: "p", text: "Chronic headaches and migraines can be debilitating, affecting your ability to work, enjoy time with family, and maintain quality of life. While many headache patients are managed by neurologists with medication, pain management specialists offer interventional treatments that can provide relief when medications aren't enough." },
      { type: "h2", text: "Types of Headaches We Treat" },
      { type: "p", text: "Occipital neuralgia causes sharp, shooting pain from the base of the skull radiating over the scalp. Cervicogenic headaches originate from the neck and refer pain to the head. Chronic migraines, when unresponsive to preventive medications, may benefit from interventional approaches." },
      { type: "h2", text: "Occipital Nerve Blocks" },
      { type: "p", text: "One of the most effective treatments for occipital neuralgia and many cervicogenic headaches. Using ultrasound guidance, a local anesthetic and steroid are injected around the greater and lesser occipital nerves at the base of the skull. Many patients experience significant relief within minutes." },
      { type: "h2", text: "Cervical Facet Interventions" },
      { type: "p", text: "When headaches originate from the cervical facet joints, medial branch blocks followed by radiofrequency ablation can provide months of relief. This approach is particularly effective for cervicogenic headaches that worsen with neck movement." },
      { type: "h2", text: "When to See a Pain Specialist for Headaches" },
      { type: "p", text: "Consider a pain management consultation if your headaches occur 15 or more days per month, don't respond adequately to preventive medications, originate from the back of the head or neck, or are associated with neck pain or injury." },
    ]
  },

  // ===== WEEK 14: August 4, 2026 =====
  {
    slug: "prp-therapy-joint-pain-healing",
    title: "PRP Therapy: Using Your Body's Own Healing Power for Joint Pain",
    publishDate: "2026-08-04",
    date: "August 4, 2026",
    author: "Thomas Yarrobino, FNP, DPT",
    readTime: "4 min read",
    category: "Procedures",
    excerpt: "Platelet-rich plasma therapy uses concentrated growth factors from your own blood to promote natural healing in damaged joints and tendons.",
    content: [
      { type: "p", text: "Regenerative medicine is changing how we approach joint and tendon injuries. Platelet-rich plasma (PRP) therapy uses your body's own healing factors — concentrated from a simple blood draw — to promote tissue repair and reduce inflammation in damaged areas." },
      { type: "h2", text: "How PRP Works" },
      { type: "p", text: "A small amount of your blood is drawn and placed in a centrifuge, which separates the platelet-rich plasma from other blood components. Platelets contain growth factors that are essential for tissue repair. The concentrated PRP is then injected directly into the affected joint, tendon, or ligament under ultrasound guidance." },
      { type: "h2", text: "What Can PRP Treat?" },
      { type: "p", text: "PRP has shown promising results for knee osteoarthritis, rotator cuff tendinopathy, tennis and golfer's elbow, plantar fasciitis, Achilles tendinopathy, and hip bursitis. It's a particularly attractive option for patients who want to avoid steroid injections or delay surgery." },
      { type: "h2", text: "What to Expect" },
      { type: "p", text: "The entire process takes about 30-45 minutes from blood draw to injection. You may experience mild soreness for 3-5 days as the healing response begins. It's important to avoid anti-inflammatory medications like ibuprofen for 1-2 weeks after the injection, as they can interfere with the healing process. Improvement typically develops over 4-6 weeks." },
      { type: "h2", text: "The Evidence" },
      { type: "p", text: "Clinical research supports PRP's effectiveness for specific conditions, particularly knee osteoarthritis and chronic tendon injuries. While it's not a cure-all, PRP offers a safe, natural alternative for patients looking to promote healing rather than simply mask symptoms." },
    ]
  },

  // ===== WEEK 15: August 11, 2026 =====
  {
    slug: "spinal-stenosis-treatment-without-surgery",
    title: "Spinal Stenosis: Managing Symptoms Without Surgery",
    publishDate: "2026-08-11",
    date: "August 11, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Conditions",
    excerpt: "Spinal stenosis is common as we age, but surgery isn't always necessary. Learn about the non-surgical treatments that can keep you active and comfortable.",
    content: [
      { type: "p", text: "Spinal stenosis — the narrowing of the spinal canal that puts pressure on nerves — is one of the most common spinal conditions in adults over 50. If you've been told you have stenosis, you may be worried about needing surgery. For many patients, effective non-surgical treatments can manage symptoms and maintain quality of life." },
      { type: "h2", text: "Understanding Spinal Stenosis" },
      { type: "p", text: "The spinal canal is the bony tunnel that protects your spinal cord and nerve roots. As we age, arthritis, thickened ligaments, bulging discs, and bone spurs can narrow this canal, compressing the nerves. The most common symptom is neurogenic claudication — pain, heaviness, or weakness in the legs that worsens with walking and improves with sitting or bending forward." },
      { type: "h2", text: "Non-Surgical Treatment Options" },
      { type: "p", text: "Epidural steroid injections reduce inflammation around the compressed nerves, providing relief that can last weeks to months. Physical therapy focused on flexion-based exercises can open the spinal canal and reduce nerve compression. Nerve blocks can target specific affected nerve roots. For appropriate candidates, minimally invasive lumbar decompression (MILD) can create more space in the spinal canal through a tiny incision." },
      { type: "h2", text: "When Is Surgery Recommended?" },
      { type: "p", text: "Surgery for spinal stenosis is typically reserved for patients with progressive neurological deficits, severe functional limitations despite conservative treatment, or cauda equina syndrome, which is a medical emergency. Most patients can be managed effectively without surgery." },
      { type: "h2", text: "Staying Active" },
      { type: "p", text: "Exercise is actually one of the best things you can do for spinal stenosis. Activities like cycling, swimming, and walking on a treadmill with an incline are well-tolerated because the forward-leaning position opens the spinal canal. A physical therapist can design a program tailored to your abilities." },
    ]
  },

  // ===== WEEK 16: August 18, 2026 =====
  {
    slug: "sedation-pain-procedures-what-to-know",
    title: "Sedation for Pain Procedures: What to Know Before Your Appointment",
    publishDate: "2026-08-18",
    date: "August 18, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "3 min read",
    category: "Patient Education",
    excerpt: "Dr. Fanaee offers sedation for all interventional procedures. Here's what that means for you and why it makes a difference in your experience.",
    content: [
      { type: "p", text: "One of the most common concerns patients have about pain management procedures is the procedure itself: Will it hurt? What will I feel? This is why Dr. Fanaee — who is board certified in anesthesiology in addition to pain medicine — offers sedation for all interventional procedures." },
      { type: "h2", text: "What Is Procedural Sedation?" },
      { type: "p", text: "Sedation for pain procedures typically involves IV medication that produces a state of deep relaxation and drowsiness. You remain breathing on your own and can respond to verbal cues, but you're comfortable, calm, and often have little to no memory of the procedure afterward." },
      { type: "h2", text: "Why We Offer Sedation" },
      { type: "p", text: "Many pain management practices do not offer sedation — they perform procedures with only local anesthesia. While this is medically adequate, it can leave patients anxious and uncomfortable. Dr. Fanaee's dual board certification in anesthesiology and pain medicine means he can safely provide sedation, ensuring the best possible experience." },
      { type: "h2", text: "Preparing for a Sedated Procedure" },
      { type: "p", text: "If you choose sedation, you'll need to follow a few guidelines: don't eat or drink anything for at least 6 hours before the procedure, arrange for someone to drive you home afterward, plan to rest for the remainder of the day, and wear comfortable clothing." },
      { type: "h2", text: "Is Sedation Required?" },
      { type: "p", text: "No — sedation is always optional. Some patients prefer to have procedures done with only local anesthesia, and that's perfectly fine. The option is there for those who want it, and there's no judgment either way." },
    ]
  },

  // ===== WEEK 17: August 25, 2026 =====
  {
    slug: "herniated-disc-treatment-options",
    title: "Herniated Disc: Everything You Need to Know About Treatment",
    publishDate: "2026-08-25",
    date: "August 25, 2026",
    author: "Dr. Clarence Kong",
    readTime: "5 min read",
    category: "Conditions",
    excerpt: "A herniated disc diagnosis can be scary, but most patients recover without surgery. Here's a comprehensive guide to your treatment options.",
    content: [
      { type: "p", text: "If your doctor has told you that you have a herniated disc, you probably have a lot of questions. What does it mean? Do I need surgery? Will it heal on its own? The reassuring news is that the majority of herniated discs improve with conservative treatment, and effective options exist at every stage." },
      { type: "h2", text: "What Is a Herniated Disc?" },
      { type: "p", text: "Your spinal discs are rubbery cushions between each vertebra. A herniation occurs when the soft inner material pushes through a tear in the tougher outer layer. If this material presses on a nearby nerve root, it can cause pain, numbness, tingling, or weakness in the areas served by that nerve — such as the arm (cervical herniation) or leg (lumbar herniation)." },
      { type: "h2", text: "Conservative Treatment" },
      { type: "p", text: "Many herniated discs improve within 6-12 weeks with conservative treatment including activity modification, anti-inflammatory medications, and physical therapy. Not every herniated disc causes symptoms — many are found incidentally on MRI in patients with no pain at all." },
      { type: "h2", text: "When Conservative Treatment Isn't Enough" },
      { type: "p", text: "If your pain persists beyond a few weeks or is severe enough to limit daily activities, interventional treatments can help. Epidural steroid injections deliver anti-inflammatory medication directly to the inflamed nerve, providing targeted relief. Transforaminal injections can be particularly effective for disc herniations because they target the specific nerve root being compressed." },
      { type: "h2", text: "Surgical Referral" },
      { type: "p", text: "Surgery is considered when there is progressive neurological weakness, loss of bladder or bowel function, or persistent severe symptoms despite adequate conservative and interventional treatment. Dr. Fanaee works closely with spine surgeons to ensure appropriate referrals when surgery is the best option." },
    ]
  },

  // ===== WEEK 18: September 1, 2026 =====
  {
    slug: "arthritis-pain-management-options",
    title: "Arthritis Pain: Beyond Over-the-Counter Medications",
    publishDate: "2026-09-01",
    date: "September 1, 2026",
    author: "Lisa Persico, PA-C",
    readTime: "4 min read",
    category: "Conditions",
    excerpt: "When ibuprofen and acetaminophen aren't cutting it anymore, pain management offers targeted treatments for arthritis pain in the spine, hips, knees, and shoulders.",
    content: [
      { type: "p", text: "Arthritis is the leading cause of chronic pain in adults. When over-the-counter medications no longer provide adequate relief, many patients assume their only options are stronger prescription drugs or joint replacement surgery. In reality, interventional pain management offers a range of targeted treatments that fall between these two extremes." },
      { type: "h2", text: "Spinal Arthritis (Facet Joint Arthropathy)" },
      { type: "p", text: "Arthritis in the facet joints of the spine causes neck and back pain that's typically worse with extension, twisting, and prolonged standing. Facet joint injections confirm the diagnosis, and radiofrequency ablation of the medial branch nerves can provide 6-18 months of relief." },
      { type: "h2", text: "Hip and Knee Arthritis" },
      { type: "p", text: "Ultrasound-guided corticosteroid injections reduce inflammation and pain. Hyaluronic acid injections restore joint lubrication. PRP therapy promotes natural healing. Genicular nerve blocks and ablation (for knee arthritis) can provide months of relief without affecting joint function." },
      { type: "h2", text: "Shoulder Arthritis" },
      { type: "p", text: "The shoulder's complex anatomy benefits from ultrasound-guided precision. We can inject the glenohumeral joint, subacromial bursa, or acromioclavicular (AC) joint depending on the specific source of pain." },
      { type: "h2", text: "A Comprehensive Approach" },
      { type: "p", text: "The best arthritis management combines interventional treatments with exercise, weight management, and appropriate medications. Our team works with you to develop a plan that addresses your specific joints and functional goals." },
    ]
  },

  // ===== WEEK 19: September 8, 2026 =====
  {
    slug: "neuropathy-treatment-pain-management",
    title: "Peripheral Neuropathy: When Your Nerves Need Help",
    publishDate: "2026-09-08",
    date: "September 8, 2026",
    author: "Mary Milano Carter, NP",
    readTime: "4 min read",
    category: "Conditions",
    excerpt: "Burning, tingling, and numbness in your hands or feet? Peripheral neuropathy affects millions. Learn about treatment options that go beyond gabapentin.",
    content: [
      { type: "p", text: "Peripheral neuropathy — damage to the nerves outside the brain and spinal cord — causes burning, tingling, numbness, and pain, most commonly in the hands and feet. It affects an estimated 20 million Americans, with diabetes being the most common cause." },
      { type: "h2", text: "Common Causes" },
      { type: "p", text: "Diabetes (the most common cause), chemotherapy-induced neuropathy, vitamin deficiencies (especially B12), alcohol-related neuropathy, autoimmune conditions, and idiopathic neuropathy (no identifiable cause)." },
      { type: "h2", text: "Treatment Beyond Medication" },
      { type: "p", text: "While medications like gabapentin and pregabalin are first-line treatments, they don't work for everyone and can cause significant side effects. Pain management offers additional options including spinal cord stimulation, which has shown excellent results for painful diabetic neuropathy. Peripheral nerve blocks can provide targeted relief, and medication management can optimize your drug regimen to maximize benefit while minimizing side effects." },
      { type: "h2", text: "Spinal Cord Stimulation for Neuropathy" },
      { type: "p", text: "Recent studies have shown that SCS is highly effective for painful diabetic neuropathy, with many patients achieving significant pain reduction. The trial-first approach means you can test the therapy before committing to an implant." },
      { type: "h2", text: "Managing Neuropathy Long-Term" },
      { type: "p", text: "Neuropathy is typically a chronic condition that requires ongoing management. Our team develops a comprehensive plan that may combine medication optimization, interventional procedures, and lifestyle modifications including blood sugar control for diabetic patients." },
    ]
  },

  // ===== WEEK 20: September 15, 2026 =====
  {
    slug: "kyphoplasty-compression-fracture-treatment",
    title: "Kyphoplasty: Fast Relief for Vertebral Compression Fractures",
    publishDate: "2026-09-15",
    date: "September 15, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Procedures",
    excerpt: "A compression fracture in the spine can cause severe, debilitating pain. Kyphoplasty provides rapid relief, often within 24-48 hours.",
    content: [
      { type: "p", text: "Vertebral compression fractures are one of the most painful spinal conditions we treat — and one of the most gratifying, because kyphoplasty often provides dramatic relief within a day or two." },
      { type: "h2", text: "What Causes Compression Fractures?" },
      { type: "p", text: "The most common cause is osteoporosis — the bones become so weakened that a vertebra can fracture from something as simple as bending over to pick up a grocery bag. Compression fractures can also result from cancer that has spread to the spine or from trauma." },
      { type: "h2", text: "How Kyphoplasty Works" },
      { type: "p", text: "Under sedation and fluoroscopic guidance, Dr. Fanaee inserts a thin tube into the fractured vertebra through a small incision. A specialized balloon is inflated inside the vertebra to restore its height, creating a cavity. The balloon is removed and the cavity is filled with medical-grade bone cement that hardens within minutes, stabilizing the fracture." },
      { type: "h2", text: "Results" },
      { type: "p", text: "Many patients report significant pain relief within 24-48 hours. Some experience immediate improvement upon standing after the procedure. The stabilized vertebra prevents further collapse, and the restored height helps correct spinal alignment." },
      { type: "h2", text: "Prevention" },
      { type: "p", text: "If you've had one compression fracture, you're at increased risk for more. We work with your primary care physician or endocrinologist to ensure you're receiving appropriate osteoporosis treatment to prevent future fractures." },
    ]
  },

  // ===== WEEK 21: September 22, 2026 =====
  {
    slug: "medical-marijuana-chronic-pain-new-york",
    title: "Medical Marijuana for Chronic Pain in New York: What Patients Should Know",
    publishDate: "2026-09-22",
    date: "September 22, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "4 min read",
    category: "Treatment Options",
    excerpt: "Dr. Fanaee is a certified medical marijuana prescriber in New York State. Learn how cannabis-based treatments fit into a comprehensive pain management plan.",
    content: [
      { type: "p", text: "Medical marijuana has become an increasingly important tool in the chronic pain management toolkit. As a certified prescriber in New York State, Dr. Fanaee can evaluate whether medical marijuana may be appropriate as part of your overall treatment plan." },
      { type: "h2", text: "Qualifying Conditions" },
      { type: "p", text: "In New York, chronic pain is a qualifying condition for medical marijuana. Other qualifying conditions commonly seen in our practice include neuropathy, inflammatory conditions, and pain associated with specific diseases." },
      { type: "h2", text: "How It Fits Into Pain Management" },
      { type: "p", text: "Medical marijuana is not a standalone treatment. It's most effective as one component of a comprehensive, multimodal pain management plan that may also include interventional procedures, physical therapy, and other medications. For some patients, it can reduce reliance on opioid medications." },
      { type: "h2", text: "Forms Available" },
      { type: "p", text: "New York dispensaries offer various forms including capsules, tinctures, vaporizable products, and topical applications. Different formulations contain varying ratios of THC and CBD, and your provider can guide you toward the most appropriate option for your condition." },
      { type: "h2", text: "Getting Certified" },
      { type: "p", text: "If you're interested in exploring medical marijuana, schedule an appointment with Dr. Fanaee. The evaluation determines whether you qualify, and if so, you receive a certification that allows you to purchase from licensed New York dispensaries." },
    ]
  },

  // ===== WEEK 22: September 29, 2026 =====
  {
    slug: "shoulder-pain-injection-options",
    title: "Shoulder Pain That Won't Go Away: Injection Treatment Options",
    publishDate: "2026-09-29",
    date: "September 29, 2026",
    author: "Thomas Yarrobino, FNP, DPT",
    readTime: "4 min read",
    category: "Treatment Options",
    excerpt: "Chronic shoulder pain from rotator cuff issues, bursitis, or arthritis responds well to ultrasound-guided injections. Here's what's available.",
    content: [
      { type: "p", text: "The shoulder is one of the most mobile — and therefore vulnerable — joints in the body. When pain from rotator cuff tendinopathy, bursitis, or arthritis limits your ability to reach, lift, or sleep comfortably, targeted injections can provide significant relief." },
      { type: "h2", text: "Subacromial Bursa Injection" },
      { type: "p", text: "The subacromial bursa sits between the rotator cuff and the bone above it. When this bursa becomes inflamed (bursitis), it causes pain with overhead reaching and lying on the affected side. An ultrasound-guided injection of corticosteroid into the bursa can provide rapid relief." },
      { type: "h2", text: "Glenohumeral Joint Injection" },
      { type: "p", text: "For shoulder arthritis or adhesive capsulitis (frozen shoulder), injecting directly into the shoulder joint reduces inflammation and can improve range of motion. Ultrasound guidance ensures the medication reaches the joint space." },
      { type: "h2", text: "AC Joint Injection" },
      { type: "p", text: "The acromioclavicular (AC) joint at the top of the shoulder is a common source of pain, especially in patients who have had previous injuries or arthritis. This small joint responds well to targeted corticosteroid injection." },
      { type: "h2", text: "PRP for Rotator Cuff Injuries" },
      { type: "p", text: "For partial rotator cuff tears and chronic tendinopathy, PRP injections promote natural healing. This is particularly useful for patients who want to avoid surgery or have partial tears that are appropriate for conservative management." },
    ]
  },

  // ===== WEEK 23: October 6, 2026 =====
  {
    slug: "complex-regional-pain-syndrome-crps",
    title: "Complex Regional Pain Syndrome (CRPS): Recognizing and Treating This Challenging Condition",
    publishDate: "2026-10-06",
    date: "October 6, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "5 min read",
    category: "Conditions",
    excerpt: "CRPS is one of the most challenging pain conditions. Early recognition and aggressive treatment are key to the best outcomes.",
    content: [
      { type: "p", text: "Complex Regional Pain Syndrome (CRPS) is a chronic pain condition that typically affects an arm or leg, usually developing after an injury, surgery, stroke, or heart attack. The pain is disproportionate to the initial event and can be severe, burning, and disabling. Early treatment is critical for the best outcomes." },
      { type: "h2", text: "Recognizing CRPS" },
      { type: "p", text: "CRPS is characterized by burning or throbbing pain, sensitivity to touch or cold, swelling, changes in skin temperature (the affected limb may feel warmer or cooler than the opposite side), changes in skin color or texture, changes in hair or nail growth, and joint stiffness and reduced range of motion." },
      { type: "h2", text: "Treatment Approach" },
      { type: "p", text: "Effective CRPS treatment requires an aggressive, multidisciplinary approach started as early as possible. Sympathetic nerve blocks, such as stellate ganglion blocks for upper extremity CRPS, can provide significant relief. Physical therapy is essential to maintain mobility. Medication management addresses neuropathic pain. Spinal cord stimulation and DRG stimulation are options for refractory cases." },
      { type: "h2", text: "Spinal Cord Stimulation for CRPS" },
      { type: "p", text: "SCS has shown strong results for CRPS, and dorsal root ganglion (DRG) stimulation has emerged as a particularly effective option for this condition. The trial-first approach allows patients to verify the therapy's effectiveness before permanent implantation." },
      { type: "h2", text: "The Importance of Early Treatment" },
      { type: "p", text: "CRPS outcomes are significantly better when treatment begins early. If you're experiencing disproportionate pain after an injury or surgery, especially with the signs listed above, don't wait — seek evaluation from a pain management specialist as soon as possible." },
    ]
  },

  // ===== WEEK 24: October 13, 2026 =====
  {
    slug: "office-based-surgery-vs-hospital-procedures",
    title: "Office-Based Surgery vs. Hospital Procedures: What's the Difference?",
    publishDate: "2026-10-13",
    date: "October 13, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "3 min read",
    category: "Patient Education",
    excerpt: "We offer an office-based surgical practice as a convenient alternative to hospital-based procedures. Here's what that means for your experience.",
    content: [
      { type: "p", text: "When patients learn they need an interventional pain procedure, one of the first questions is: where will it be done? At Long Island Brain and Spine, we offer two options — hospital-based procedures at Good Samaritan Hospital and our office-based surgical practice. Here's how they compare." },
      { type: "h2", text: "Office-Based Surgery" },
      { type: "p", text: "Our office-based surgical practice provides a convenient, personalized environment for many interventional pain procedures. You arrive and are treated in the same familiar office where you see your provider. There's no hospital registration process, no navigating a large facility, and no separate facility fees. The experience is streamlined and comfortable." },
      { type: "h2", text: "Hospital-Based Procedures" },
      { type: "p", text: "Some procedures — particularly more complex ones like spinal cord stimulator implantation and kyphoplasty — are performed at Good Samaritan Hospital in West Islip. The hospital environment provides access to additional resources, monitoring capabilities, and support services." },
      { type: "h2", text: "Which Is Right for You?" },
      { type: "p", text: "Dr. Fanaee determines the most appropriate setting based on the specific procedure, your medical history, and your preferences. Many patients prefer the convenience and comfort of the office-based setting, while others may require or prefer the hospital environment. Either way, you receive the same expert care." },
      { type: "h2", text: "Sedation in Both Settings" },
      { type: "p", text: "Sedation is available for all procedures regardless of where they're performed. Dr. Fanaee's board certification in anesthesiology ensures safe sedation administration in any setting." },
    ]
  },

  // ===== WEEK 25: October 20, 2026 =====
  {
    slug: "trigger-point-injections-muscle-pain",
    title: "Trigger Point Injections: Fast Relief for Muscle Pain and Tension",
    publishDate: "2026-10-20",
    date: "October 20, 2026",
    author: "Lisa Persico, PA-C",
    readTime: "3 min read",
    category: "Procedures",
    excerpt: "Those painful knots in your neck, shoulders, and back have a name — myofascial trigger points. Here's how trigger point injections provide rapid relief.",
    content: [
      { type: "p", text: "You know the feeling: a persistent, painful knot in your neck or shoulder that just won't let go, no matter how much you stretch or massage it. These are myofascial trigger points, and they're one of the most common causes of chronic muscle pain." },
      { type: "h2", text: "What Are Trigger Points?" },
      { type: "p", text: "Trigger points are tight bands of muscle fiber that form when muscles don't relax properly. They can cause pain at the trigger point itself and referred pain in other areas. For example, a trigger point in your upper trapezius muscle can cause headaches that radiate up the side of your head." },
      { type: "h2", text: "How Trigger Point Injections Work" },
      { type: "p", text: "Your provider locates the trigger point by palpation and inserts a thin needle directly into the knot. A small amount of local anesthetic is injected, which immediately releases the muscle contraction and breaks the pain cycle. Multiple trigger points can be treated in a single session, and the entire procedure takes about 5-10 minutes." },
      { type: "h2", text: "How Many Sessions Do I Need?" },
      { type: "p", text: "Some patients experience lasting relief after a single session. For chronic myofascial pain, a series of treatments combined with stretching, physical therapy, and ergonomic modifications often provides the best long-term results. Trigger point injections can be repeated as needed." },
    ]
  },

  // ===== WEEK 26: October 27, 2026 =====
  {
    slug: "pain-management-doctor-west-islip-smithtown-bellmore",
    title: "Pain Management on Long Island: Three Locations to Serve You",
    publishDate: "2026-10-27",
    date: "October 27, 2026",
    author: "Dr. Eric Fanaee",
    readTime: "3 min read",
    category: "About Us",
    excerpt: "With offices in West Islip, Smithtown, and Bellmore, Long Island Brain and Spine brings board-certified pain management to every corner of Long Island.",
    content: [
      { type: "p", text: "At Long Island Brain and Spine, we believe that access to quality pain management shouldn't require a long drive. That's why we maintain three office locations across Long Island, ensuring that most Suffolk and Nassau County residents are within a short distance of expert pain care." },
      { type: "h2", text: "West Islip — South Shore" },
      { type: "p", text: "Our West Islip office at 380 Montauk Highway serves the South Shore communities including Bay Shore, Babylon, Islip, Brightwaters, Lindenhurst, and the surrounding areas. This location is convenient to the Southern State Parkway and is our primary office where Dr. Fanaee sees patients. Procedures are also performed at nearby Good Samaritan Hospital." },
      { type: "h2", text: "Smithtown — North Shore / Central Suffolk" },
      { type: "p", text: "Located at 48 NY-25A, Suite 302, our Smithtown office serves the North Shore and central Suffolk County including Hauppauge, Commack, Kings Park, St. James, Nesconset, Lake Ronkonkoma, and surrounding communities. This location is easily accessible from the Long Island Expressway and Northern State Parkway." },
      { type: "h2", text: "Bellmore — Nassau County" },
      { type: "p", text: "Our newest location at 250 Pettit Avenue, Suite 03 brings our services to Nassau County. Serving Bellmore, Merrick, Wantagh, Seaford, Massapequa, Freeport, and the surrounding areas, this office provides the same comprehensive pain management services available at our Suffolk locations." },
      { type: "h2", text: "Same Team, Same Quality" },
      { type: "p", text: "All three locations are staffed by our experienced team of five providers, offering the full range of interventional pain management services. Sedation is available for procedures at every location. Whether you're closer to the South Shore, North Shore, or Nassau County, expert pain management is nearby." },
      { type: "p", text: "To schedule an appointment at any location, call 631-265-2020 or request an appointment online." },
    ]
  },
];



const REVIEWS = [
  { text: "Dr. Fanaee is the most caring physician. He changed the quality of my life.", author: "Google Review", rating: 5 },
  { text: "NYC quality doctor here on Long Island. Truly one of the most compassionate doctors I have ever met.", author: "Google Review", rating: 5 },
  { text: "I have been a patient for over three years. He always listens and offers options for treatment.", author: "Google Review", rating: 5 },
  { text: "Dr. Fanaee and his staff are wonderful. He takes his time to explain everything.", author: "Google Review", rating: 5 },
  { text: "From my first visit, he made me feel comfortable and confident. I returned to a pain-free life.", author: "Google Review", rating: 5 },
  { text: "The entire staff is professional and caring. Best pain management practice on Long Island.", author: "Google Review", rating: 5 },
];

const PROCEDURES = [
  {
    slug: "epidural-steroid-injections",
    title: "Epidural Steroid Injections",
    subtitle: "Targeted Relief for Spinal Pain",
    metaDescription: "Epidural steroid injections for back pain, sciatica, and herniated discs on Long Island. Board-certified pain management at three convenient locations. Dr. Eric Fanaee.",
    hero: "Epidural steroid injections (ESIs) are one of the most effective non-surgical treatments for back pain, neck pain, and sciatica caused by inflamed or compressed spinal nerves.",
    overview: "An epidural steroid injection delivers a powerful anti-inflammatory medication directly into the epidural space surrounding the spinal nerves. By reducing inflammation at the source of pain, ESIs can provide significant relief for weeks to months — often enough to allow you to participate in physical therapy and rehabilitation.",
    howItWorks: "Using real-time fluoroscopic (X-ray) guidance, Dr. Fanaee precisely places a thin needle into the epidural space near the affected nerve root. A contrast dye is injected first to confirm exact needle placement, followed by a combination of corticosteroid and local anesthetic. The entire procedure takes approximately 5–10 minutes. Sedation is available for patient comfort.",
    conditions: ["Herniated or bulging discs", "Sciatica (lumbar radiculopathy)", "Spinal stenosis", "Degenerative disc disease", "Cervical radiculopathy (neck pain radiating to arms)", "Failed back surgery syndrome"],
    types: ["Cervical epidural steroid injection (neck)", "Thoracic epidural steroid injection (mid-back)", "Lumbar epidural steroid injection (lower back)", "Caudal epidural steroid injection", "Transforaminal epidural steroid injection (selective nerve root block)"],
    benefits: ["Non-surgical, outpatient procedure", "Takes only 5–10 minutes", "Rapid pain relief, often within days", "Allows participation in physical therapy", "Can be repeated if needed", "Sedation offered for all procedures"],
    recovery: "Most patients can return to normal activities within 24–48 hours. You may experience temporary numbness at the injection site. Pain relief typically begins within 2–7 days as the steroid takes full effect. We recommend avoiding strenuous activity for 24 hours after the procedure.",
    faqs: [
      { q: "How long does an epidural steroid injection last?", a: "Relief from an epidural steroid injection typically lasts 2 weeks to 6 months, depending on the underlying condition. Some patients experience longer-lasting relief, especially when combined with physical therapy." },
      { q: "How many epidural injections can I have?", a: "Most physicians recommend no more than 3–4 epidural steroid injections per year in the same area. Dr. Fanaee evaluates each patient individually to determine the appropriate treatment frequency." },
      { q: "Is an epidural steroid injection painful?", a: "The procedure itself involves minimal discomfort. A local anesthetic numbs the skin before the injection. Dr. Fanaee also offers sedation for all interventional procedures to ensure maximum comfort." },
      { q: "What is the difference between an epidural and a nerve block?", a: "An epidural steroid injection delivers medication into the epidural space, which can affect multiple nerve roots. A selective nerve block targets a single specific nerve. Dr. Fanaee determines which approach is best based on your imaging and symptoms." },
    ]
  },
  {
    slug: "radiofrequency-ablation",
    title: "Radiofrequency Ablation (RFA)",
    subtitle: "Long-Lasting Pain Relief",
    metaDescription: "Radiofrequency ablation for chronic back pain and neck pain on Long Island. Provides 6–18 months of relief. Board-certified pain management specialist Dr. Eric Fanaee.",
    hero: "Radiofrequency ablation (RFA) uses controlled heat energy to disrupt the nerves responsible for transmitting pain signals, providing long-lasting relief for chronic neck and back pain.",
    overview: "RFA is an advanced interventional technique for patients with chronic pain that has responded positively to diagnostic nerve blocks. By using radiofrequency energy to heat and disable specific pain-transmitting nerves, RFA can provide relief lasting 6 to 18 months — significantly longer than steroid injections alone.",
    howItWorks: "Under fluoroscopic guidance, Dr. Fanaee positions a specialized radiofrequency needle adjacent to the target nerve. The needle tip is heated using radiofrequency energy, creating a small lesion that disrupts the nerve's ability to transmit pain signals. The procedure takes approximately 5–10 minutes per level treated. A diagnostic medial branch block is typically performed first to confirm the pain source before proceeding with ablation.",
    conditions: ["Chronic facet joint pain (neck and back)", "Sacroiliac (SI) joint pain", "Cervical facet arthropathy", "Lumbar facet arthropathy", "Chronic pain unresponsive to steroid injections", "Pain confirmed by positive diagnostic nerve blocks"],
    types: ["Cervical radiofrequency ablation (neck)", "Lumbar radiofrequency ablation (lower back)", "Sacroiliac joint radiofrequency ablation", "Cooled radiofrequency ablation", "Pulsed radiofrequency"],
    benefits: ["Long-lasting relief: 6–18 months typical", "Minimally invasive, outpatient procedure", "5–10 minute procedure time", "Can be safely repeated when pain returns", "Reduces or eliminates need for pain medication", "Sedation offered for all procedures"],
    recovery: "Patients may experience mild soreness at the treatment site for 1–2 weeks as the area heals. Full pain relief typically develops within 2–4 weeks. Most patients return to normal activities within a few days. The treated nerves will eventually regenerate, at which point the procedure can be repeated.",
    faqs: [
      { q: "How long does radiofrequency ablation last?", a: "RFA typically provides pain relief for 6 to 18 months. When the treated nerves regenerate and pain returns, the procedure can be safely repeated with similar results." },
      { q: "What is the success rate of radiofrequency ablation?", a: "Studies show that RFA provides significant pain relief in approximately 70–80% of properly selected patients — those who have had a positive response to diagnostic nerve blocks." },
      { q: "Is radiofrequency ablation permanent?", a: "RFA is not permanent. The treated nerves typically regenerate over 6–18 months. However, the procedure can be repeated, and many patients undergo RFA multiple times with consistent results." },
      { q: "What is the difference between RFA and a nerve block?", a: "A nerve block temporarily numbs a nerve using an anesthetic (lasting hours to days). RFA uses heat to disable the nerve for months, providing much longer-lasting relief. Diagnostic nerve blocks are often used first to confirm that RFA will be effective." },
    ]
  },
  {
    slug: "spinal-cord-stimulation",
    title: "Spinal Cord Stimulation",
    subtitle: "Advanced Neuromodulation for Chronic Pain",
    metaDescription: "Spinal cord stimulation for chronic pain on Long Island. Advanced neuromodulation therapy for back pain, leg pain, and CRPS. Dr. Eric Fanaee, board-certified pain specialist.",
    hero: "Spinal cord stimulation (SCS) is an advanced pain management therapy that uses a small implanted device to send mild electrical impulses to the spinal cord, interrupting pain signals before they reach the brain.",
    overview: "SCS is designed for patients with chronic pain who have not found adequate relief from other treatments. A small pulse generator is implanted under the skin and connected to thin leads placed in the epidural space. The system delivers gentle electrical stimulation that replaces the sensation of pain with a mild tingling or, with newer technology, provides relief without any sensation at all.",
    howItWorks: "Treatment begins with a trial period lasting 5–7 days, during which temporary leads are placed and connected to an external device. This allows you to experience the therapy in your daily life before committing to a permanent implant. If the trial provides significant relief (typically 50% or greater pain reduction), a permanent device is implanted in a brief outpatient procedure. Modern SCS systems are MRI-compatible, rechargeable, and can be adjusted via a handheld controller.",
    conditions: ["Failed back surgery syndrome", "Complex regional pain syndrome (CRPS)", "Chronic radiculopathy (leg or arm pain)", "Peripheral neuropathy", "Chronic intractable back pain", "Arachnoiditis"],
    types: ["Traditional spinal cord stimulation", "High-frequency stimulation (HF10)", "Burst stimulation", "Dorsal root ganglion (DRG) stimulation", "Closed-loop stimulation"],
    benefits: ["Trial period before permanent implantation", "Reversible — can be removed if needed", "Reduces reliance on pain medications", "Adjustable settings for personalized relief", "MRI-compatible modern devices", "Significant improvement in quality of life"],
    recovery: "After the trial, you'll return to the office to evaluate your results. If successful, permanent implantation is typically performed within a few weeks. Recovery from permanent implantation takes 2–4 weeks, during which you should avoid bending, twisting, and heavy lifting. Most patients return to normal activities within 4–6 weeks.",
    faqs: [
      { q: "What does spinal cord stimulation feel like?", a: "Traditional SCS produces a mild tingling sensation (paresthesia) that replaces the feeling of pain. Newer high-frequency and burst stimulation technologies provide pain relief without any tingling sensation." },
      { q: "Is spinal cord stimulation covered by insurance?", a: "Yes, most major insurance plans including Medicare cover spinal cord stimulation when medically necessary. Our office handles pre-authorization and works directly with your insurance provider." },
      { q: "Can I have an MRI with a spinal cord stimulator?", a: "Most modern SCS devices are MRI-compatible under certain conditions. Dr. Fanaee uses FDA-approved MRI-conditional systems. Your device's specific MRI compatibility will be discussed during your consultation." },
      { q: "What is the trial period for spinal cord stimulation?", a: "Before permanent implantation, you undergo a 5–7 day trial where temporary leads are placed. This allows you to test the therapy during your daily activities. A successful trial typically means 50% or greater pain reduction." },
    ]
  },
  {
    slug: "intracept-procedure",
    title: "Intracept® Procedure",
    subtitle: "Targeting the Source of Chronic Low Back Pain",
    metaDescription: "Intracept procedure for chronic low back pain on Long Island. FDA-cleared minimally invasive treatment targeting the basivertebral nerve. Dr. Eric Fanaee, pain management specialist.",
    hero: "The Intracept® procedure is an FDA-cleared, minimally invasive treatment that targets the basivertebral nerve — a previously undertreated source of chronic low back pain.",
    overview: "Many patients with chronic low back pain have vertebrogenic pain, meaning the pain originates from within the vertebral bones themselves. The basivertebral nerve (BVN) transmits pain signals from damaged vertebral endplates, often associated with Modic changes seen on MRI. The Intracept procedure uses radiofrequency energy to ablate the BVN, addressing the root cause of this specific type of back pain.",
    howItWorks: "Under fluoroscopic guidance, Dr. Fanaee advances a specialized curved probe through the pedicle of the vertebral body to reach the basivertebral nerve at the center of the vertebra. Radiofrequency energy is then applied to ablate the nerve, permanently disrupting its ability to transmit pain signals. The procedure typically takes 30–60 minutes and is performed on an outpatient basis with sedation.",
    conditions: ["Chronic low back pain lasting 6+ months", "Vertebrogenic pain (pain from the vertebral body)", "Modic Type 1 or Type 2 changes on MRI", "Pain unresponsive to conservative treatment (physical therapy, medications, injections)", "Patients seeking a non-fusion surgical option"],
    types: [],
    benefits: ["FDA-cleared with Level I evidence (randomized controlled trials)", "Targets the root cause of vertebrogenic pain", "Minimally invasive, implant-free", "Single outpatient procedure", "Durable long-term results (5+ year data)", "Preserves spinal mobility — no fusion required"],
    recovery: "Most patients return to light activities within 1–2 weeks. Some temporary soreness at the treatment site is normal. Significant pain improvement typically develops over 2–6 weeks as post-procedure inflammation resolves. Long-term clinical studies show sustained pain relief at 5+ years following the procedure.",
    faqs: [
      { q: "What is the Intracept procedure?", a: "Intracept is an FDA-cleared, minimally invasive procedure that uses radiofrequency energy to ablate the basivertebral nerve inside the vertebral body. This nerve is responsible for transmitting chronic low back pain signals in patients with vertebrogenic pain. The procedure is implant-free and performed as an outpatient." },
      { q: "How do I know if I'm a candidate for Intracept?", a: "Candidates typically have chronic low back pain lasting 6 or more months that hasn't responded to conservative treatments. An MRI showing Modic Type 1 or Type 2 endplate changes is a key indicator that vertebrogenic pain may be the source. Dr. Fanaee evaluates your MRI and clinical history to determine candidacy." },
      { q: "How long does the Intracept procedure last?", a: "Clinical studies show durable pain relief lasting 5 or more years. Unlike nerve blocks or epidural injections, the Intracept procedure targets the nerve permanently, providing long-term results from a single procedure." },
      { q: "Is Intracept covered by insurance?", a: "Many major insurance plans now cover the Intracept procedure, including Medicare. Coverage has expanded significantly as the clinical evidence supporting the procedure has grown. Our office verifies your insurance coverage and handles pre-authorization." },
    ]
  },
  {
    slug: "kyphoplasty",
    title: "Kyphoplasty",
    subtitle: "Treating Vertebral Compression Fractures",
    metaDescription: "Kyphoplasty for vertebral compression fractures on Long Island. Minimally invasive treatment to relieve pain and restore vertebral height. Dr. Eric Fanaee.",
    hero: "Kyphoplasty is a minimally invasive procedure that treats painful vertebral compression fractures by stabilizing the fractured vertebra and restoring vertebral body height.",
    overview: "Vertebral compression fractures are common in patients with osteoporosis, cancer, or spinal trauma. These fractures cause severe back pain and can lead to progressive spinal deformity (kyphosis). Kyphoplasty addresses both the pain and the structural damage by first creating space within the collapsed vertebra using a balloon, then filling that space with bone cement to stabilize the fracture.",
    howItWorks: "Under fluoroscopic guidance and sedation, Dr. Fanaee inserts a thin tube through a small incision into the fractured vertebral body. A specialized balloon (balloon tamp) is inflated inside the vertebra to restore its height and create a cavity. The balloon is then removed and medical-grade bone cement (PMMA) is injected into the cavity, where it hardens within minutes to stabilize the fracture. The procedure typically takes 30–45 minutes per level.",
    conditions: ["Osteoporotic vertebral compression fractures", "Vertebral fractures from cancer or metastatic disease", "Painful compression fractures unresponsive to bracing and medication", "Progressive spinal deformity (kyphosis) from fractures"],
    types: ["Balloon kyphoplasty", "Vertebroplasty (cement injection without balloon)"],
    benefits: ["Rapid pain relief — often within 24–48 hours", "Restores vertebral body height", "Prevents progressive spinal deformity", "Minimally invasive, outpatient procedure", "Short recovery time", "Sedation provided for comfort"],
    recovery: "Many patients experience significant pain relief within 24–48 hours of the procedure. You may have some soreness at the needle insertion site for a few days. Most patients can resume normal daily activities within 1–2 days. A follow-up appointment is scheduled to assess your healing and discuss osteoporosis management to prevent future fractures.",
    faqs: [
      { q: "What is the difference between kyphoplasty and vertebroplasty?", a: "Both procedures stabilize compression fractures with bone cement. Kyphoplasty uses a balloon to first restore vertebral height before injecting cement, potentially correcting spinal deformity. Vertebroplasty injects cement directly without a balloon. Dr. Fanaee typically recommends kyphoplasty for its ability to restore vertebral height." },
      { q: "How soon will I feel better after kyphoplasty?", a: "Many patients experience significant pain relief within 24–48 hours. Some patients report immediate improvement upon standing after the procedure." },
      { q: "Is kyphoplasty safe?", a: "Kyphoplasty is a well-established procedure with a strong safety profile. Serious complications are rare. The most common risk is a small cement leak outside the vertebral body, which rarely causes symptoms. Dr. Fanaee uses fluoroscopic guidance throughout the procedure to ensure precise cement placement." },
    ]
  },
  {
    slug: "nerve-blocks",
    title: "Nerve Blocks",
    subtitle: "Precision Pain Relief",
    metaDescription: "Ultrasound and fluoroscopy-guided nerve blocks for chronic pain on Long Island. Precise, targeted pain relief. Dr. Eric Fanaee, board-certified pain management.",
    hero: "Nerve blocks are precision injections that deliver anesthetic and anti-inflammatory medication directly to specific nerves, providing targeted relief for a wide range of pain conditions.",
    overview: "A nerve block interrupts pain signals traveling along a specific nerve or group of nerves. By delivering medication directly to the source of pain, nerve blocks can provide rapid relief and help diagnose the exact cause of your symptoms. Nerve blocks serve both therapeutic and diagnostic purposes — they relieve pain and help determine whether a specific nerve is responsible for your symptoms.",
    howItWorks: "Using ultrasound or fluoroscopic guidance for precision, Dr. Fanaee places a thin needle adjacent to the target nerve. A combination of local anesthetic and corticosteroid is injected to reduce inflammation and block pain signals. The procedure takes approximately 5–10 minutes. Image guidance ensures accuracy and safety.",
    conditions: ["Occipital neuralgia (headaches)", "Intercostal neuralgia (rib pain)", "Trigeminal neuralgia (facial pain)", "Peripheral nerve entrapment", "Stellate ganglion block for CRPS and sympathetic pain", "Celiac plexus block for abdominal pain", "Genicular nerve block for knee pain"],
    types: ["Stellate ganglion block", "Occipital nerve block", "Intercostal nerve block", "Peripheral nerve block", "Genicular nerve block", "Celiac plexus block", "Superior hypogastric plexus block", "Ganglion impar block"],
    benefits: ["Rapid pain relief, often within minutes", "Diagnostic value — confirms pain source", "Minimally invasive, 5–10 minutes", "Ultrasound or fluoroscopy-guided precision", "Can be therapeutic and diagnostic", "Sedation offered for all procedures"],
    recovery: "Most patients experience some relief immediately from the local anesthetic. The steroid component provides longer-lasting relief, typically peaking within 5–7 days. You may have temporary numbness in the treated area for several hours. Normal activities can usually be resumed the same day.",
    faqs: [
      { q: "How long does a nerve block last?", a: "The duration depends on the type of nerve block and the medications used. Diagnostic blocks using only local anesthetic last hours. Therapeutic blocks with corticosteroids can provide relief lasting weeks to months." },
      { q: "What is the difference between a nerve block and an epidural?", a: "An epidural delivers medication into the space around the spinal cord and can affect multiple nerves. A nerve block targets a specific individual nerve or nerve group outside the spine. Dr. Fanaee determines which approach is best based on your condition." },
    ]
  },
  {
    slug: "prp-therapy",
    title: "PRP Therapy",
    subtitle: "Regenerative Medicine for Natural Healing",
    metaDescription: "PRP therapy (platelet-rich plasma) for joint pain, tendon injuries, and arthritis on Long Island. Regenerative medicine using your body's own healing factors. Dr. Eric Fanaee.",
    hero: "Platelet-rich plasma (PRP) therapy harnesses your body's own healing factors to promote tissue repair and reduce inflammation in damaged joints, tendons, and ligaments.",
    overview: "PRP is a form of regenerative medicine that uses a concentrated preparation of your own blood platelets to accelerate healing. Platelets contain growth factors that play a crucial role in tissue repair. By concentrating these growth factors and injecting them directly into the injured area, PRP therapy can stimulate your body's natural healing response.",
    howItWorks: "A small amount of your blood is drawn and placed in a centrifuge, which separates the platelet-rich plasma from other blood components. The concentrated PRP is then injected directly into the affected joint, tendon, or ligament under ultrasound guidance for precision. The entire process takes approximately 30–45 minutes from blood draw to injection.",
    conditions: ["Knee osteoarthritis", "Rotator cuff tendinopathy", "Tennis elbow (lateral epicondylitis)", "Plantar fasciitis", "Hip bursitis", "Achilles tendinopathy", "Ligament sprains", "SI joint pain"],
    types: ["Leukocyte-rich PRP (LR-PRP)", "Leukocyte-poor PRP (LP-PRP)", "Single-spin PRP", "Double-spin PRP"],
    benefits: ["Uses your own blood — no risk of allergic reaction", "Non-surgical, minimally invasive", "Promotes natural tissue healing", "No steroid side effects", "Ultrasound-guided precision", "Can delay or prevent need for surgery"],
    recovery: "You may experience mild soreness and swelling at the injection site for 3–5 days as the healing response begins. Avoid anti-inflammatory medications (ibuprofen, naproxen) for 1–2 weeks after the injection, as they can interfere with the healing process. Most patients see improvement within 4–6 weeks, with continued improvement over 3–6 months.",
    faqs: [
      { q: "Is PRP therapy covered by insurance?", a: "Most insurance plans do not currently cover PRP therapy, as it is still considered investigational by many carriers. Our office can provide detailed pricing information during your consultation." },
      { q: "How many PRP treatments do I need?", a: "Many patients experience significant improvement after a single injection. Depending on the condition and severity, 1–3 treatments spaced 4–6 weeks apart may be recommended." },
      { q: "Does PRP therapy actually work?", a: "Clinical research supports the effectiveness of PRP for specific conditions, particularly knee osteoarthritis and tendon injuries. Results vary by condition and individual. Dr. Fanaee evaluates whether PRP is appropriate for your specific situation." },
    ]
  },
  {
    slug: "joint-injections",
    title: "Joint & Bursa Injections",
    subtitle: "Targeted Joint Pain Relief",
    metaDescription: "Ultrasound-guided joint injections for shoulder, hip, knee, and SI joint pain on Long Island. Precise, targeted pain relief. Dr. Eric Fanaee, pain management specialist.",
    hero: "Ultrasound-guided joint and bursa injections deliver anti-inflammatory medication directly into painful joints, providing targeted relief for arthritis, bursitis, and other joint conditions.",
    overview: "Joint injections are a cornerstone of pain management for conditions affecting the shoulders, hips, knees, sacroiliac joints, and other joints throughout the body. By delivering corticosteroids or hyaluronic acid directly into the affected joint under ultrasound guidance, these injections provide precise, targeted relief with minimal discomfort.",
    howItWorks: "Using real-time ultrasound imaging, Dr. Fanaee or one of our providers visualizes the joint and guides a thin needle directly into the joint space or bursa. This image-guided approach ensures the medication reaches the exact target. A combination of corticosteroid and local anesthetic is typically injected. The procedure takes approximately 5–10 minutes.",
    conditions: ["Knee osteoarthritis", "Shoulder impingement and bursitis", "Hip arthritis and trochanteric bursitis", "Sacroiliac (SI) joint dysfunction", "AC joint arthritis", "Ankle and foot joint pain", "Wrist and hand arthritis"],
    types: ["Corticosteroid joint injection", "Hyaluronic acid (viscosupplementation)", "Sacroiliac joint injection", "Bursa injection (subacromial, trochanteric, pes anserine)", "Ultrasound-guided aspiration"],
    benefits: ["Ultrasound-guided for maximum precision", "5–10 minute outpatient procedure", "Rapid pain relief", "Reduces inflammation at the source", "Can delay or prevent need for surgery", "Sedation available if needed"],
    recovery: "Most patients can return to normal activities immediately. Some soreness at the injection site is normal for 1–2 days. The steroid typically takes 3–5 days to reach full effect. Avoid strenuous activity involving the treated joint for 24–48 hours.",
    faqs: [
      { q: "How long do joint injections last?", a: "Corticosteroid joint injections typically provide relief lasting 1–3 months. Hyaluronic acid injections (viscosupplementation) may provide relief lasting 6 months or longer. The duration varies based on the condition and individual response." },
      { q: "Why is ultrasound guidance important for joint injections?", a: "Ultrasound allows the provider to visualize the joint in real time, ensuring the needle is placed precisely within the joint space. Studies show that ultrasound-guided injections are significantly more accurate than landmark-guided (blind) injections, resulting in better outcomes." },
    ]
  },
  {
    slug: "trigger-point-injections",
    title: "Trigger Point Injections",
    subtitle: "Relief for Muscle Pain and Tension",
    metaDescription: "Trigger point injections for muscle pain, myofascial pain, and tension on Long Island. Quick, effective treatment for painful muscle knots. Dr. Eric Fanaee.",
    hero: "Trigger point injections (TPIs) target painful knots in muscles — called myofascial trigger points — that can cause localized pain and referred pain in other parts of the body.",
    overview: "Myofascial trigger points are tight bands of muscle fiber that form when muscles don't relax properly. These knots can cause local pain, referred pain patterns, and restricted range of motion. Trigger point injections deliver medication directly into the trigger point, releasing the muscle contraction and breaking the pain cycle.",
    howItWorks: "Dr. Fanaee or one of our providers locates the trigger point by palpation and inserts a thin needle directly into the knot. A small amount of local anesthetic, corticosteroid, or simply a dry needle technique is used to inactivate the trigger point and release the muscle contraction. Multiple trigger points can be treated in a single session. The procedure takes approximately 5–10 minutes.",
    conditions: ["Myofascial pain syndrome", "Chronic neck and shoulder tension", "Tension headaches", "Upper and lower back muscle pain", "Fibromyalgia-related muscle pain", "TMJ-related muscle pain"],
    types: ["Local anesthetic trigger point injection", "Corticosteroid trigger point injection", "Dry needling", "Botox trigger point injection"],
    benefits: ["Quick procedure — 5–10 minutes", "Immediate muscle tension relief", "Minimal recovery time", "Can treat multiple points in one visit", "Breaks the pain-spasm-pain cycle", "No sedation typically required"],
    recovery: "Most patients experience immediate relief of muscle tension. Some soreness at the injection site is normal for 1–2 days. Stretching and heat application after the procedure can enhance the results. Normal activities can be resumed immediately.",
    faqs: [
      { q: "How often can I get trigger point injections?", a: "Trigger point injections can be repeated as needed, typically every 2–4 weeks. For chronic myofascial pain, a series of injections combined with physical therapy and stretching often provides the best long-term results." },
      { q: "Are trigger point injections the same as dry needling?", a: "They are similar but not identical. Trigger point injections involve injecting medication (anesthetic and/or steroid) into the trigger point. Dry needling uses a needle without medication — the mechanical action of the needle itself helps release the muscle knot. Both techniques are effective." },
    ]
  },
  {
    slug: "chronic-pain-management",
    title: "Chronic Pain Management",
    subtitle: "Comprehensive, Multimodal Care",
    metaDescription: "Comprehensive chronic pain management on Long Island. Multimodal treatment plans combining interventional procedures, medication management, and rehabilitation. Dr. Eric Fanaee.",
    hero: "Chronic pain requires a comprehensive, multimodal approach. At Long Island Brain & Spine, we combine interventional procedures, medication management, physical therapy, and lifestyle strategies to help you regain control of your life.",
    overview: "Living with chronic pain affects every aspect of your life — your ability to work, sleep, exercise, and enjoy time with family. Our approach goes beyond simply treating symptoms. We identify and address the underlying causes of your pain through a combination of the most effective, evidence-based treatments available.",
    howItWorks: "Your treatment begins with a thorough evaluation including medical history, physical examination, review of imaging, and discussion of your goals. Dr. Fanaee and our team develop a personalized treatment plan that may include interventional procedures, carefully managed medications, physical therapy referrals, and lifestyle modifications. Your plan is continuously adjusted based on your progress.",
    conditions: ["Chronic low back pain", "Chronic neck pain", "Failed back surgery syndrome", "Fibromyalgia", "Complex regional pain syndrome (CRPS)", "Chronic headaches and migraines", "Cancer-related pain", "Neuropathic pain", "Chronic joint pain"],
    types: ["Interventional procedures (injections, ablations, stimulators)", "Medication management (non-opioid focused)", "Physical therapy coordination", "Medical marijuana certification (NY State)", "Referral coordination with surgeons and specialists"],
    benefits: ["Individualized treatment plans", "Evidence-based, multimodal approach", "Focus on function and quality of life", "Non-opioid-first philosophy", "Coordination with your other healthcare providers", "Five experienced providers across three locations"],
    recovery: "Chronic pain management is an ongoing relationship, not a single treatment. We schedule regular follow-up visits to assess your progress, adjust your treatment plan, and ensure you're meeting your functional goals. Many patients see significant improvement within the first few weeks of treatment.",
    faqs: [
      { q: "Do you prescribe opioids for chronic pain?", a: "Our approach emphasizes non-opioid treatments first, including interventional procedures, non-opioid medications, and physical therapy. When appropriate, opioid medications may be part of a comprehensive pain management plan, always with careful monitoring and in compliance with New York State regulations." },
      { q: "Do you accept workers' compensation and no-fault cases?", a: "Yes, we treat patients with workers' compensation and no-fault insurance. Our team handles the authorization process and required documentation." },
      { q: "Can you certify patients for medical marijuana?", a: "Yes, Dr. Fanaee is a certified medical marijuana prescriber in New York State. He evaluates whether medical marijuana may be appropriate as part of your overall pain management plan." },
      { q: "What should I bring to my first appointment?", a: "Please bring your insurance card, photo ID, a list of current medications, and any relevant medical records or imaging (MRI, X-ray, CT scan). If your imaging is stored at a hospital or imaging center, you can request a CD or have the records sent to our office before your visit." },
    ]
  },
];

// ============================================================
// SCHEMA.ORG STRUCTURED DATA (injected as JSON-LD)
// ============================================================
const schemaData = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Eric Fanaee, MD – Pain Management",
  "alternateName": "Long Island Brain & Spine",
  "description": "Board-certified interventional pain management physician serving Long Island, NY. University of Chicago residency trained, NYU Langone fellowship trained. Specializing in epidural steroid injections, radiofrequency ablation, spinal cord stimulation, Intracept procedure, kyphoplasty, nerve blocks, PRP therapy, and joint injections. Offices in West Islip, Smithtown, and Bellmore. Accepting Medicare, workers compensation, no-fault, and most major insurance. 4.9 stars with 634+ Google reviews. Sedation offered for all interventional procedures. Specializing in epidural injections, radiofrequency ablation, spinal cord stimulation, and minimally invasive spine procedures. Three locations: West Islip, Smithtown, and Bellmore.",
  "url": SITE_URL,
  "telephone": "+1-631-265-2020",
  "priceRange": "$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "634", "bestRating": "5" },
  "medicalSpecialty": ["Pain Medicine", "Anesthesiology", "Interventional Pain Management"],
  "availableService": TREATMENTS.map(t => ({ "@type": "MedicalProcedure", "name": t.name, "description": t.desc })),
  "employee": PROVIDERS.map(p => ({ "@type": "Physician", "name": p.name, "description": p.role, "medicalSpecialty": "Pain Medicine" })),
  "location": LOCATIONS.map(l => ({
    "@type": "MedicalClinic",
    "name": `Dr. Fanaee – ${l.name} Office`,
    "address": { "@type": "PostalAddress", "streetAddress": l.address, "addressLocality": l.name, "addressRegion": "NY", "postalCode": l.city.split(" ").pop() },
    "geo": { "@type": "GeoCoordinates", "latitude": l.lat, "longitude": l.lng },
    "telephone": "+1-631-265-2020",
    "openingHours": "Mo-Fr 08:00-17:00"
  })),
  "mainEntityOfPage": {
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question", "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }
};

// ============================================================
// COMPONENTS
// ============================================================

const StarRow = ({ rating = 5, size = 16, color = "#f4b740" }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? color : "#334155"}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const SectionLabel = ({ text, light = false }) => (
  <div style={{ fontSize: 12, fontWeight: 600, color: light ? "#4da3ff" : "#2d8cf0", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{text}</div>
);

const SectionTitle = ({ children, light = false }) => (
  <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontWeight: 400, color: light ? "white" : "#0a192f", lineHeight: 1.2 }}>{children}</h2>
);

// ============================================================
// MAIN SITE
// ============================================================

const ProcedurePage = ({ procedure, onBack, onSchedule }) => {
  const [openFaq, setOpenFaq] = useState(null);
  const p = procedure;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: "#0f1c2e" }}>
      {/* Breadcrumb nav */}
      <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Services
          </button>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>{p.subtitle}</div>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white", lineHeight: 1.2, marginBottom: 16 }}>{p.title}</h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 700 }}>{p.hero}</p>
          <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
            <button onClick={onSchedule} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "14px 28px", color: "white", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Overview */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>Overview</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.overview}</p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 16 }}>How It Works</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.howItWorks}</p>
        </div>
      </section>

      {/* Conditions + Benefits side by side */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Conditions Treated</h2>
            {p.conditions.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2d8cf0", flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Benefits</h2>
            {p.benefits.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eef2f6" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: 14, color: "#3a4a5c" }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types if available */}
      {p.types.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 20 }}>Types of {p.title}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {p.types.map((t, i) => (
                <div key={i} style={{ padding: "14px 18px", background: "white", borderRadius: 10, border: "1px solid #eef2f6", fontSize: 14, color: "#3a4a5c", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8cf0", flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recovery */}
      <section style={{ padding: "64px 32px", background: "white" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 16 }}>Recovery & What to Expect</h2>
          <p style={{ fontSize: 16, color: "#5a6b7d", lineHeight: 1.8 }}>{p.recovery}</p>
        </div>
      </section>

      {/* FAQ */}
      {p.faqs.length > 0 && (
        <section style={{ padding: "64px 32px", background: "#f8fafb" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 24 }}>Frequently Asked Questions</h2>
            {p.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0a192f", paddingRight: 16 }}>{faq.q}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7, paddingBottom: 18 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "64px 32px", background: "#0a192f", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "white", marginBottom: 12 }}>Ready to Explore {p.title}?</h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: 28 }}>Schedule a consultation with Dr. Fanaee to determine if this treatment is right for you.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={onSchedule} style={{ padding: "14px 32px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "14px 24px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{PHONE}</a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ padding: "20px 32px", background: "#060d18", display: "flex", justifyContent: "center", alignItems: "center", gap: 16 }}>
        <StarRow size={14} />
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>4.9 out of 5 · 634 Google Reviews · Board Certified Pain Medicine & Anesthesiology · Since 2013</span>
      </div>
    </div>
  );
};


export default function DrFanaeeSite() {
  const [showApptModal, setShowApptModal] = useState(false);
  const [activeProcedure, setActiveProcedure] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);
  const [showBlogIndex, setShowBlogIndex] = useState(false);
  
  // Auto-publish: only show articles where publishDate <= today
  const publishedPosts = BLOG_POSTS.filter(post => {
    const publishDate = new Date(post.publishDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return publishDate <= today;
  }).sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  const [apptForm, setApptForm] = useState({ name: "", phone: "", email: "", location: "", reason: "", new_patient: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [heroImage, setHeroImage] = useState(0);
  const heroImages = [
    { src: IMG_ERIC, alt: "Dr. Eric Fanaee - Pain Management Specialist" },
    { src: IMG_CONSULT, alt: "Dr. Fanaee consulting with patient using spine model" },
    { src: IMG_PROCEDURE, alt: "Dr. Fanaee in the procedure room with fluoroscopy equipment" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setActiveReview(p => (p + 1) % REVIEWS.length), 5000);
    const heroTimer = setInterval(() => setHeroImage(p => (p + 1) % 3), 5000);
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", s);
    return () => { clearInterval(t); clearInterval(heroTimer); window.removeEventListener("scroll", s); };
  }, []);

  const inp = (key, label, type, placeholder, required = false) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>{label}{required ? " *" : ""}</label>
      <input type={type} placeholder={placeholder} value={apptForm[key]}
        onChange={e => setApptForm(p => ({ ...p, [key]: e.target.value }))}
        style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", outline: "none" }}
        onFocus={e => e.target.style.borderColor = "#2d8cf0"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif", color: "#0f1c2e", background: "#fff" }}>
      {/* Blog post view */}
      {activeBlog && (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              <button onClick={() => { setActiveBlog(null); if (!showBlogIndex) window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back
              </button>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{activeBlog.category}</div>
              <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 38, color: "white", lineHeight: 1.25, marginBottom: 16 }}>{activeBlog.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 16, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
                <span>{activeBlog.author}</span>
                <span>•</span>
                <span>{activeBlog.date}</span>
                <span>•</span>
                <span>{activeBlog.readTime}</span>
              </div>
            </div>
          </div>
          <div style={{ padding: "48px 32px 80px", background: "white" }}>
            <div style={{ maxWidth: 760, margin: "0 auto" }}>
              {activeBlog.content.map((block, i) => {
                if (block.type === "h2") return <h2 key={i} style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: "#0a192f", marginTop: 36, marginBottom: 12 }}>{block.text}</h2>;
                return <p key={i} style={{ fontSize: 16, color: "#3a4a5c", lineHeight: 1.8, marginBottom: 16 }}>{block.text}</p>;
              })}
              <div style={{ marginTop: 48, padding: "32px", background: "#f8fafb", borderRadius: 16, textAlign: "center" }}>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", marginBottom: 8 }}>Have Questions About Your Pain?</h3>
                <p style={{ fontSize: 14, color: "#5a6b7d", marginBottom: 20 }}>Schedule a consultation with our team to discuss your treatment options.</p>
                <button onClick={() => { setActiveBlog(null); setShowBlogIndex(false); setShowApptModal(true); }} style={{ padding: "14px 28px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Request an Appointment</button>
              </div>
            </div>
          </div>
          <div style={{ padding: "20px 32px", background: "#060d18", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Eric Fanaee, MD &middot; Long Island Brain & Spine</span>
          </div>
        </div>
      )}

      {/* Blog index view */}
      {showBlogIndex && !activeBlog && (
        <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          <div style={{ background: "#0a192f", padding: "100px 32px 60px" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <button onClick={() => { setShowBlogIndex(false); window.scrollTo(0, 0); }} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginBottom: 20 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                Back to Home
              </button>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#4da3ff", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12 }}>Pain Management Insights</div>
              <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 44, color: "white" }}>Blog</h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>Expert advice on pain management, treatment options, and patient education from the team at Long Island Brain & Spine.</p>
            </div>
          </div>
          <div style={{ padding: "48px 32px 80px", background: "#f8fafb" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {publishedPosts.map((post, i) => (
                <div key={i} onClick={() => { setActiveBlog(post); window.scrollTo(0, 0); }} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", cursor: "pointer", transition: "all 0.3s" }}
                  onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                  <div style={{ height: 8, background: "linear-gradient(90deg, #2d8cf0, #1e5fa0)" }} />
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", background: "#eef4fb", color: "#2d6a8a", borderRadius: 4 }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: "#94a3b8" }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0a192f", marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: "#7a8a9d", lineHeight: 1.6, marginBottom: 14 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#94a3b8" }}>{post.date}</span>
                      <span style={{ fontSize: 12, color: "#2d8cf0", fontWeight: 600 }}>Read more →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "20px 32px", background: "#060d18", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>&copy; 2026 Eric Fanaee, MD &middot; Long Island Brain & Spine</span>
          </div>
        </div>
      )}

      {activeProcedure && (
        <ProcedurePage 
          procedure={activeProcedure} 
          onBack={() => { setActiveProcedure(null); window.scrollTo(0, 0); }}
          onSchedule={() => { setActiveProcedure(null); setShowApptModal(true); }}
        />
      )}
      {!activeProcedure && <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #2d8cf0; color: white; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .6; } }
      `}</style>

      {/* Schema.org JSON-LD */}
      <div style={{ display: "none" }} dangerouslySetInnerHTML={{ __html: `<script type="application/ld+json">${JSON.stringify(schemaData)}</script>` }} />

      {/* ===== NAV ===== */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(10,25,47,0.97)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.4s", padding: scrolled ? "10px 0" : "18px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #2d8cf0, #1e5fa0)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><ellipse cx="12" cy="3.5" rx="3.5" ry="2"/><ellipse cx="12" cy="8.5" rx="3" ry="1.8"/><ellipse cx="12" cy="13" rx="2.8" ry="1.7"/><ellipse cx="12" cy="17" rx="2.5" ry="1.5"/><ellipse cx="12" cy="20.5" rx="2" ry="1.3"/></svg>
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15, fontFamily: "'Instrument Serif', Georgia, serif" }}>Eric Fanaee, MD</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 500, letterSpacing: "1.2px", textTransform: "uppercase" }}>Pain Medicine</div>
            </div>
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["Services", "Providers", "Locations", "Insurance", "FAQ", "Blog"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); if (l === "Blog") { setShowBlogIndex(true); setActiveProcedure(null); setActiveBlog(null); window.scrollTo(0, 0); } else { setShowBlogIndex(false); setActiveBlog(null); setActiveProcedure(null); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); } }} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s", cursor: "pointer" }}
                onMouseOver={e => e.target.style.color = "white"} onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.65)"}>{l}</a>
            ))}
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {PHONE}
            </a>
            <button onClick={() => setShowApptModal(true)} style={{ padding: "10px 22px", background: "linear-gradient(135deg, #2d8cf0, #1e5fa0)", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 12px rgba(45,140,240,0.3)" }}>
              Request Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "linear-gradient(165deg, #0a192f 0%, #0f2340 40%, #122a4f 70%, #1a365d 100%)" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,140,240,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "8%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,140,240,0.05) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "140px 32px 80px", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeInUp 0.8s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(45,140,240,0.1)", borderRadius: 20, marginBottom: 24, border: "1px solid rgba(45,140,240,0.18)" }}>
              <StarRow size={12} />
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: 600, letterSpacing: "0.5px" }}>4.9 STARS · 634+ GOOGLE REVIEWS</span>
            </div>
            <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 54, fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: 12 }}>
              At the Forefront of<br/><span style={{ color: "#4da3ff" }}>Pain Medicine</span><br/><span style={{ fontSize: 24, color: "rgba(255,255,255,0.4)" }}>Since 2013</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 32, maxWidth: 500 }}>
              Board-certified interventional pain management serving Long Island. Advanced, non-surgical treatments to reduce pain, restore function, and get you back to the life you love.
            </p>
            <div style={{ display: "flex", gap: 14, marginBottom: 40 }}>
              <button onClick={() => setShowApptModal(true)} style={{ padding: "16px 32px", background: "linear-gradient(135deg, #2d8cf0, #1e6dd4)", color: "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(45,140,240,0.35)" }}>
                Request an Appointment
              </button>
              <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "16px 28px", background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {PHONE}
              </a>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {[{ l: "Board Certified", v: "Pain Medicine & Anesthesiology" }, { l: "Training", v: "U of Chicago · NYU Langone" }, { l: "Serving Long Island", v: "Since 2013" }].map((s, i) => (
                <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 500 }}>{s.l}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600, marginTop: 3 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right - headshot placeholder */}
          <div style={{ display: "flex", justifyContent: "center", animation: "fadeInUp 1s ease 0.2s both" }}>
            <div style={{ width: 380, height: 440, borderRadius: 24, background: "#0f2340", position: "relative", overflow: "hidden" }}>
              {/* Carousel images */}
              {heroImages.map((img, i) => (
                <img key={i} src={img.src} alt={img.alt} style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center center",
                  opacity: heroImage === i ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }} />
              ))}
              {/* Dot indicators */}
              <div style={{ position: "absolute", bottom: 76, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 2 }}>
                {heroImages.map((_, i) => (
                  <button key={i} onClick={() => setHeroImage(i)} style={{
                    width: heroImage === i ? 20 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                    background: heroImage === i ? "white" : "rgba(255,255,255,0.4)", transition: "all 0.3s"
                  }} />
                ))}
              </div>
              {/* Floating review count */}
              <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, background: "rgba(10,25,47,0.85)", backdropFilter: "blur(12px)", borderRadius: 14, padding: "14px 18px", border: "1px solid rgba(45,140,240,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 2 }}>
                <div>
                  <StarRow size={14} />
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>634+ verified reviews</div>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#4da3ff" }}>4.9</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEDATION BANNER ===== */}
      <section style={{ padding: "20px 32px", background: "linear-gradient(90deg, #2d8cf0, #1e6dd4)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "white" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Sedation Offered for All Interventional Pain Procedures</span>
        </div>
      </section>

      {/* ===== CONDITIONS ===== */}
      <section id="services" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="What We Treat" />
            <SectionTitle>Conditions We Treat</SectionTitle>
            <p style={{ fontSize: 15, color: "#5a6b7d", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
              Comprehensive pain management for acute and chronic conditions affecting the spine, joints, and nervous system.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {CONDITIONS.map((c, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, padding: "24px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s", cursor: "default" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "rgba(45,140,240,0.2)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#eef2f6"; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#7a8a9d", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENTS ===== */}
      <section style={{ padding: "100px 32px", background: "#0a192f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="How We Help" light />
            <SectionTitle light>Interventional Services</SectionTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {TREATMENTS.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "24px 28px", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", cursor: "pointer" }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(45,140,240,0.2)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                onClick={() => { const proc = PROCEDURES.find(p => p.title === t.name); if (proc) { setActiveProcedure(proc); window.scrollTo(0, 0); } }}>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d8cf0", marginTop: 7, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 6 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: "#4da3ff", fontWeight: 600 }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROVIDERS ===== */}
      <section id="providers" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Our Team" />
            <SectionTitle>Our Experienced Team</SectionTitle>
          </div>
          {/* Featured provider - Eric */}
          <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", marginBottom: 24, display: "grid", gridTemplateColumns: "280px 1fr", gap: 0 }}>
            <div style={{ background: "linear-gradient(135deg, #0a192f, #1a365d)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
              <img src={IMG_ERIC} alt="Dr. Eric Fanaee" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center center" }} />
            </div>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#2d8cf0", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>Medical Director</div>
              <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 30, color: "#0a192f", marginBottom: 4 }}>Eric Fanaee, MD</h3>
              <div style={{ fontSize: 13, color: "#5a6b7d", marginBottom: 16 }}>Board Certified in Pain Medicine & Anesthesiology · University of Chicago · NYU Langone</div>
              <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 20 }}>{PROVIDERS[0].bio}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["Pain Medicine", "Anesthesiology", "Interventional Spine", "NYU Fellowship"].map(t => (
                  <span key={t} style={{ padding: "5px 12px", background: "#eef4fb", color: "#2d6a8a", fontSize: 11, fontWeight: 600, borderRadius: 6 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Other providers */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {PROVIDERS.slice(1).map((p, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 220, background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#0a192f", marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#2d8cf0", marginBottom: 10, letterSpacing: "0.2px" }}>{p.role}</div>
                  <div style={{ fontSize: 12, color: "#5a6b7d", lineHeight: 1.6 }}>{p.bio}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel text="Patient Reviews" />
          <SectionTitle>What Our Patients Say</SectionTitle>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, margin: "12px 0 48px" }}>
            <StarRow size={20} />
            <span style={{ fontSize: 14, color: "#5a6b7d", fontWeight: 500 }}>4.9 out of 5 · 634 reviews on Google</span>
          </div>
          <div style={{ position: "relative", minHeight: 160 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ position: i === activeReview ? "relative" : "absolute", top: 0, left: 0, right: 0, opacity: i === activeReview ? 1 : 0, transition: "opacity 0.5s", padding: "32px 40px", background: "#f8fafb", borderRadius: 20, border: "1px solid #eef2f6" }}>
                <StarRow size={18} />
                <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "#0a192f", lineHeight: 1.6, marginTop: 16, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 16, fontWeight: 500 }}>— {r.author}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {REVIEWS.map((_, i) => (
              <button key={i} onClick={() => setActiveReview(i)} style={{ width: i === activeReview ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", background: i === activeReview ? "#2d8cf0" : "#d1d9e3", transition: "all 0.3s" }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCATIONS ===== */}
      <section id="locations" style={{ padding: "100px 32px", background: "#f8fafb" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Visit Us" />
            <SectionTitle>Conveniently Located Across Long Island</SectionTitle>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {LOCATIONS.map((loc, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", border: "1px solid #eef2f6", transition: "all 0.3s" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
                <div style={{ height: 160, background: "#e8eef4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center", color: "#94a3b8" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Google Map embed</div>
                  </div>
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0a192f", marginBottom: 12, fontFamily: "'Instrument Serif', Georgia, serif" }}>{loc.name}</h3>
                  <div style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7, marginBottom: 16 }}>{loc.address}<br/>{loc.city}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2d8cf0" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    <a href={`tel:${loc.phone.replace(/-/g,"")}`} style={{ fontSize: 14, color: "#2d8cf0", fontWeight: 600, textDecoration: "none" }}>{loc.phone}</a>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span style={{ fontSize: 13, color: "#94a3b8" }}>{loc.hours}</span>
                  </div>
                  {loc.nearby && <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.5, borderTop: "1px solid #eef2f6", paddingTop: 12 }}>{loc.nearby}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSURANCE ===== */}
      <section id="insurance" style={{ padding: "80px 32px", background: "#0a192f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <SectionLabel text="Insurance" light />
            <SectionTitle light>Insurance We Accept</SectionTitle>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginTop: 12, maxWidth: 600, margin: "12px auto 0" }}>
              We accept most major insurance plans. Contact our office to verify your specific coverage.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
            {["Medicare", "Aetna", "Blue Cross Blue Shield", "Cigna", "United Healthcare", "Oxford", "Humana", "Empire", "Fidelis", "Healthfirst", "Magnacare", "Multiplan", "Workers' Compensation", "No-Fault / Motor Vehicle", "GHI / Emblem Health", "GHI-NYC", "NYSHIP", "UHC Community Plan", "Wellcare", "1199"].map((ins, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, textAlign: "center" }}>
                {ins}
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Don't see your plan? Call us at <a href="tel:6312652020" style={{ color: "#4da3ff", textDecoration: "none" }}>{PHONE}</a> — we may still accept your insurance.</p>
          </div>
        </div>
      </section>

      {/* ===== FAQ (SEO + AI) ===== */}
      <section id="faq" style={{ padding: "100px 32px", background: "white" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionLabel text="Questions" />
            <SectionTitle>Frequently Asked Questions</SectionTitle>
          </div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid #eef2f6", overflow: "hidden" }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "20px 0", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", justifyContent: "space-between", alignItems: "center", textAlign: "left" }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#0a192f", paddingRight: 16 }}>{faq.q}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.3s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div style={{ maxHeight: openFaq === i ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                <p style={{ fontSize: 14, color: "#5a6b7d", lineHeight: 1.7, paddingBottom: 20 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section style={{ padding: "80px 32px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <SectionLabel text="Insights" />
              <SectionTitle>From Our Blog</SectionTitle>
            </div>
            <button onClick={() => { setShowBlogIndex(true); window.scrollTo(0, 0); }} style={{ fontSize: 14, color: "#2d8cf0", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>View all articles →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {publishedPosts.slice(0, 3).map((post, i) => (
              <div key={i} onClick={() => { setActiveBlog(post); window.scrollTo(0, 0); }} style={{ background: "#f8fafb", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "all 0.3s", border: "1px solid #eef2f6" }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ height: 6, background: "linear-gradient(90deg, #2d8cf0, #1e5fa0)" }} />
                <div style={{ padding: "22px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", background: "#eef4fb", color: "#2d6a8a", borderRadius: 4 }}>{post.category}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0a192f", marginTop: 12, marginBottom: 8, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: "#7a8a9d", lineHeight: 1.5 }}>{post.excerpt.substring(0, 100)}...</p>
                  <div style={{ marginTop: 14, fontSize: 12, color: "#2d8cf0", fontWeight: 600 }}>Read more →</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: "80px 32px", background: "linear-gradient(135deg, #0a192f, #1a365d)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, color: "white", marginBottom: 14 }}>Ready to Start Feeling Better?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>Take the first step toward pain relief. Request an appointment or call us today.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button onClick={() => setShowApptModal(true)} style={{ padding: "16px 36px", background: "#2d8cf0", color: "white", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(45,140,240,0.35)" }}>Request an Appointment</button>
            <a href={`tel:${PHONE.replace(/-/g,"")}`} style={{ padding: "16px 28px", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, fontSize: 16, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "48px 32px 24px", background: "#060d18" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, color: "white", marginBottom: 8 }}>Eric Fanaee, MD</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6, maxWidth: 280 }}>Board-certified Pain Medicine and Anesthesiology. At the forefront of interventional pain management on Long Island.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Quick Links</div>
            {["Services", "Providers", "Locations", "Insurance", "FAQ", "Blog"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); }} style={{ display: "block", color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none", marginBottom: 10, cursor: "pointer" }}>{l}</a>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Locations</div>
            {LOCATIONS.map(l => <div key={l.name} style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>{l.name}, NY</div>)}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Contact</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>Phone: {PHONE}</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 10 }}>Fax: {FAX}</div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, textAlign: "center" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>&copy; 2026 Eric Fanaee, MD · Long Island Brain & Spine · All rights reserved</div>
        </div>
      </footer>

      </>}
      {/* ===== APPOINTMENT MODAL ===== */}
      {showApptModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(10,25,47,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}
          onClick={() => { setShowApptModal(false); setFormSubmitted(false); }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
            {!formSubmitted ? (
              <div style={{ padding: "36px 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 4 }}>Request an Appointment</h3>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>Our team will contact you to confirm.</p>
                  </div>
                  <button onClick={() => setShowApptModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 20 }}>✕</button>
                </div>
                {inp("name", "Full Name", "text", "John Smith", true)}
                {inp("phone", "Phone Number", "tel", "(631) 555-1234", true)}
                {inp("email", "Email", "email", "john@email.com")}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>Preferred Location</label>
                    <select value={apptForm.location} onChange={e => setApptForm(p => ({ ...p, location: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "white" }}>
                      <option value="">Select...</option>{LOCATIONS.map(l => <option key={l.name} value={l.name}>{l.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>New or Existing?</label>
                    <select value={apptForm.new_patient} onChange={e => setApptForm(p => ({ ...p, new_patient: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "white" }}>
                      <option value="">Select...</option><option value="new">New Patient</option><option value="existing">Existing Patient</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0a192f", marginBottom: 6 }}>Reason for Visit</label>
                  <textarea placeholder="Brief description of your pain or condition..." value={apptForm.reason} onChange={e => setApptForm(p => ({ ...p, reason: e.target.value }))}
                    style={{ width: "100%", minHeight: 80, padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, fontFamily: "inherit", resize: "vertical" }} />
                </div>
                <button onClick={handleApptSubmit} style={{ width: "100%", padding: "16px", background: (!apptForm.name || !apptForm.phone) ? "#e2e8f0" : "linear-gradient(135deg, #2d8cf0, #1e6dd4)", color: (!apptForm.name || !apptForm.phone) ? "#94a3b8" : "white", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: (!apptForm.name || !apptForm.phone) ? "default" : "pointer", fontFamily: "inherit" }}>
                  Submit Request
                </button>
                <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", marginTop: 12 }}>This is a request only. Our office will contact you to confirm your appointment.</p>
              </div>
            ) : (
              <div style={{ padding: "48px 32px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(45,140,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d8cf0" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 26, color: "#0a192f", marginBottom: 8 }}>Request Received</h3>
                <p style={{ fontSize: 15, color: "#5a6b7d", lineHeight: 1.6, marginBottom: 28 }}>Thank you, {apptForm.name.split(" ")[0]}. Our team will call you at {apptForm.phone} to confirm your appointment.</p>
                <button onClick={() => { setShowApptModal(false); setFormSubmitted(false); setApptForm({ name: "", phone: "", email: "", location: "", reason: "", new_patient: "" }); }}
                  style={{ padding: "14px 28px", background: "#0a192f", color: "white", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
