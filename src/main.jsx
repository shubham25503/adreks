import React,{useEffect,useState}from'react';
import{createRoot}from'react-dom/client';

import{gsap}from'gsap';import{ScrollTrigger}from'gsap/ScrollTrigger';import'./style.css';import'./reference.css';
gsap.registerPlugin(ScrollTrigger);
const variant='editorial';
const services=[{"slug": "social-media", "title": "Social media management", "short": "A consistent, recognisable social presence that gives people a reason to stop, follow and come back.", "intro": "Social media works best when every post belongs to a bigger story. We plan and create useful, recognisable content for Instagram, Facebook and LinkedIn, then help keep the conversation moving.", "kicker": "SOCIAL STRATEGY · CONTENT · COMMUNITY", "deliverables": ["Monthly content direction and calendar", "Static post and carousel design", "Caption writing and calls to action", "Platform-ready formatting and publishing support", "Community management and response guidance", "Monthly review of content and audience response"], "steps": [["01", "Find the voice", "Understand the audience, brand personality and what people need to hear."], ["02", "Plan the rhythm", "Build a realistic calendar across Instagram, Facebook and LinkedIn."], ["03", "Make and publish", "Create platform-specific graphics, carousels and captions."], ["04", "Learn from response", "Review engagement and refine the next content cycle."]]}, {"slug": "paid-advertising", "title": "Google & Meta advertising", "short": "Paid campaigns with a clear audience, a considered message and a useful next step.", "intro": "We plan and manage paid advertising across Google Ads and Meta Ads. That can mean reaching people as they search, introducing your offer in social feeds, or reconnecting with people who have already shown interest.", "kicker": "GOOGLE ADS · META ADS · CAMPAIGN CREATIVE", "deliverables": ["Campaign objectives and audience planning", "Google Search campaign setup and structure", "Meta campaign setup across Facebook and Instagram", "Ad copy and creative direction", "Creative variations for learning and testing", "Ongoing optimisation and clear reporting"], "steps": [["01", "Set the objective", "Agree what the campaign needs to do and how we’ll read its performance."], ["02", "Build the campaign", "Plan audiences, placements, budget structure and creative assets."], ["03", "Launch with care", "Check links, tracking, copy and creative before a campaign goes live."], ["04", "Review and refine", "Use campaign signals to improve what runs next."]]}, {"slug": "seo-aeo-geo", "title": "SEO, AEO & GEO", "short": "Make your business easier to find through helpful content and a sound search foundation.", "intro": "Search is changing, but clarity still matters. We help strengthen your site’s SEO foundations, make your expertise easier to understand, and structure useful information for answer engines and generative search experiences.", "kicker": "SEARCH ENGINE · ANSWER ENGINE · GENERATIVE ENGINE", "deliverables": ["On-page content and heading structure", "Technical and page-health recommendations", "Search intent and keyword themes", "Local search and business profile guidance", "Answer Engine Optimisation (AEO) content structure", "Generative Engine Optimisation (GEO) clarity and authority signals"], "steps": [["01", "Review the landscape", "Understand what people search for and how your site currently appears."], ["02", "Fix the foundations", "Prioritise clear structure, useful pages and technical improvements."], ["03", "Build helpful content", "Answer real customer questions with direct, well-organised information."], ["04", "Keep improving", "Review visibility and update content as the business and search change."]]}, {"slug": "social-design", "title": "Social post & carousel design", "short": "Static posts and carousels that feel like one brand and make the message easy to follow.", "intro": "Good social design does more than fill a calendar. We turn your message into a visual system people can recognise, understand quickly and share across the platforms where your audience spends time.", "kicker": "STATIC POSTS · CAROUSELS · CAMPAIGN GRAPHICS", "deliverables": ["Static post design for offers, announcements and education", "Carousel story structure and slide-by-slide design", "Reusable branded layouts for recurring topics", "Campaign creative variations for social placements", "Platform-ready sizing and export", "Creative direction aligned to your brand identity"], "steps": [["01", "Shape the message", "Clarify the one thing a post or carousel should communicate."], ["02", "Choose the format", "Decide whether the idea needs a single frame or a swipe-through story."], ["03", "Design the system", "Use consistent type, colour and layout without making every post identical."], ["04", "Prepare to publish", "Deliver final files sized for the selected channels."]]}, {"slug": "reels-editing", "title": "Reels & short-form video editing", "short": "Short videos with a clear opening, thoughtful pace and a finish that feels like your brand.", "intro": "We edit short-form videos for social platforms, shaping the footage you provide into focused Reels and vertical clips. The edit can include hook selection, pacing, subtitles, transitions, sound and simple brand details.", "kicker": "REELS · VERTICAL VIDEO · EDITING", "deliverables": ["Footage review and edit direction", "Opening hook and sequence shaping", "Vertical edits for Reels and short-form placements", "Subtitles and on-screen text", "Transitions, pacing and sound balancing", "Exported versions ready for social publishing"], "steps": [["01", "Gather the brief", "Confirm audience, platform, key message and the footage available."], ["02", "Find the strongest cut", "Shape a clear opening and a sequence that holds attention."], ["03", "Polish the edit", "Add subtitles, pacing, transitions and sound details."], ["04", "Deliver for social", "Export a clean vertical file for the agreed platform."]]}, {"slug": "branding-logo", "title": "Branding & logo design", "short": "A clear identity people can recognise wherever they meet your business.", "intro": "Branding begins with what you want people to remember. We develop a visual direction and logo system that gives your business a coherent presence across social media, print and everyday customer touchpoints.", "kicker": "BRAND DIRECTION · LOGO · VISUAL IDENTITY", "deliverables": ["Brand discovery and visual direction", "Logo concepts and selected refinements", "Colour and typography choices", "Basic usage guidance for consistent application", "Social profile and campaign adaptations", "Identity files for digital and print use"], "steps": [["01", "Understand the business", "Talk through your audience, positioning and what makes the brand distinct."], ["02", "Explore a direction", "Set a visual point of view before refining the identity."], ["03", "Design the system", "Develop the logo and core elements that work together."], ["04", "Prepare the handoff", "Supply final assets and practical usage guidance."]]}, {"slug": "print-collateral", "title": "Business cards & print collateral", "short": "Thoughtful, on-brand print pieces for the moments that happen away from the screen.", "intro": "From a useful business card to a brochure that explains your offer, print should feel like a natural extension of the brand. We design practical collateral with clear hierarchy, ready to share with your printer.", "kicker": "BUSINESS CARDS · BANNERS · FLYERS · POSTERS · BROCHURES", "deliverables": ["Business card design", "Banners and display graphics", "Flyers and promotional handouts", "Posters for launches, events and offers", "Brochures and multi-section information pieces", "Print-ready artwork prepared to supplied specifications"], "steps": [["01", "Confirm the use", "Understand where the piece will appear and what it needs to communicate."], ["02", "Organise the content", "Set a useful hierarchy for information, imagery and calls to action."], ["03", "Design for the format", "Build the layout around the real size and viewing distance."], ["04", "Prepare production files", "Export print-ready artwork to the printer’s specifications."]]}];
const projects=[["Lijjat Khaman House", "Campaign creative", "lijjat-standee-live-food-items.webp", "A bright, in-the-world campaign for a local food favourite."], ["Lijjat Food Solutions", "Print & collateral", "lijjat-brochure-corporate-food-solutions.webp", "A clear menu of corporate catering options, built for print."], ["Sukhadia Khambhatwala", "Social content", "sukhadia-khambhatwala.webp", "Social-first creative for a Gujarati food brand."], ["Treta Derma", "Healthcare communication", "treta-derma.webp", "Approachable content for a skin and hair institute."], ["Lijjat Khaman House", "Outdoor & vehicle branding", "lijjat-tempo-side-angled.webp", "Taking the brand out of the shop and into the streets."], ["SFW The Gym", "Fitness & promotions", "sfw-the-gym-logo.webp", "Promotional creative for a local fitness community."]];
const clients=[["Vama Insecticide Treatment Centre", "vama-insecticide-treatment-centre.webp"], ["Treta Derma", "treta-derma.webp"], ["Maninagar Physiotherapy Clinic", "maninagar-physiotherapy-clinic.webp"], ["SFW The Gym", "sfw-the-gym-logo.webp"], ["Eventus Oncology", "eventus-oncology.webp"], ["Sukhadia Khambhatwala", "sukhadia-khambhatwala.webp"], ["YV Products", "yv-products.webp"]];
const portfolio='https://desaikavan03.github.io/kavan-desai-portfolio/';
function useLocation(){const[pathname,setPathname]=useState(window.location.pathname);useEffect(()=>{const update=()=>setPathname(window.location.pathname);window.addEventListener('popstate',update);window.addEventListener('adreks:navigate',update);return()=>{window.removeEventListener('popstate',update);window.removeEventListener('adreks:navigate',update)}},[]);return{pathname}}
function Link({to,children,className,onClick,...props}){return <a href={to} className={className} onClick={event=>{onClick?.(event);if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();if(to.startsWith('http')){window.location.href=to;return}window.history.pushState({},'',to);window.dispatchEvent(new Event('adreks:navigate'))}} {...props}>{children}</a>}
function NavLink({to,...props}){
  const {pathname}=useLocation();
  return <Link to={to} aria-current={pathname===to ? 'page' : undefined} {...props}/>;
}
const labelFor=(slug)=>services.find(item=>item.slug===slug)?.title||'Services';
function usePageMotion(){const location=useLocation();useEffect(()=>{window.scrollTo(0,0);const activeService=services.find(item=>location.pathname==='/services/'+item.slug);const pageTitles={'/':'Adreks — Advertising, Design & Growth','/studio':'Studio — Adreks','/services':'Services — Adreks','/work':'Selected Work — Adreks','/contact':'Contact — Adreks'};document.title=activeService?activeService.title+' — Adreks':(pageTitles[location.pathname]||'Page not found — Adreks');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const ctx=gsap.context(()=>{gsap.from('.page-enter',{y:24,opacity:0,duration:.65,stagger:.07,ease:'power2.out'});gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.from(el,{y:28,opacity:0,duration:.7,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}}));const orb=document.querySelector('.hero-orbit');if(orb)gsap.to(orb,{rotate:360,duration:38,repeat:-1,ease:'none'});},document.body);return()=>ctx.revert()},[location.pathname])}
function Header(){
  const [open,setOpen]=useState(false);
  const {pathname}=useLocation();
  useEffect(()=>setOpen(false),[pathname]);
  useEffect(()=>{
    if(!open)return;
    function onKey(event){
      if(event.key==='Escape'){
        setOpen(false);
        document.getElementById('main-menu-toggle')?.focus();
      }
    }
    window.addEventListener('keydown',onKey);
    return ()=>window.removeEventListener('keydown',onKey);
  },[open]);
  const links=[['/','Home'],['/studio','Studio'],['/services','Services'],['/work','Work'],['/contact','Contact']];
  return <header className="site-header reference-header">
    <Link className="wordmark" to="/">ADREKS</Link>
    <nav className="reference-nav" aria-label="Main navigation">
      {links.map(([to,label])=><NavLink key={to} to={to}>{label}</NavLink>)}
    </nav>
    <button className="reference-toggle" id="main-menu-toggle" aria-controls="main-menu" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>
      <span>{open?'Close':'Menu'}</span><b aria-hidden="true">{open?'×':'☰'}</b>
    </button>
    {open&&<nav className="reference-menu open" id="main-menu" aria-label="Expanded navigation">
      {links.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)}>{label}<span aria-hidden="true">↗</span></NavLink>)}
    </nav>}
  </header>;
}

function Footer(){return <footer className="site-footer"><div className="footer-brand"><Link className="wordmark" to="/">ADREKS</Link><p>Advertising + Design<br/>Reach + Engagement<br/>Keep Scaling</p></div><div className="footer-nav"><strong>EXPLORE</strong><Link to="/studio">Studio</Link><Link to="/services">Services</Link><Link to="/work">Selected work</Link><Link to="/contact">Contact</Link></div><div className="footer-nav"><strong>SERVICES</strong>{services.map(s=><Link key={s.slug} to={'/services/'+s.slug}>{s.title}</Link>)}</div><div className="footer-meta"><span>INDEPENDENT CREATIVE STUDIO</span><span>AHMEDABAD · WORKING EVERYWHERE</span><a href={portfolio} target="_blank" rel="noreferrer">Kavan’s portfolio ↗</a></div></footer>}
function PageTop({eyebrow,title,description}){return <section className="page-top page-enter"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{description&&<p className="page-lede">{description}</p>}</section>}
function CtaBand({compact=false}){return <section className={'cta-band '+(compact?'compact':'')} data-reveal><div><p className="eyebrow">HAVE A GOOD BRIEF?</p><h2>Let’s make the next<br/><em>move count.</em></h2></div><div><p>Tell us where you want to go. We’ll help work out the right creative and marketing steps to get there.</p><Link className="cta-link" to="/contact">Talk to Adreks <span>↗</span></Link></div></section>}
function ProjectGrid({limit=6}){return <div className="project-grid">{projects.slice(0,limit).map((p,i)=><a className="project-card" href={portfolio+'#work'} target="_blank" rel="noreferrer" key={p[0]+p[2]} data-reveal><div className="project-image"><img src={'/assets/'+p[2]} alt={p[0]+' '+p[1]}/><span className="project-index">0{i+1}</span><span className="project-arrow">↗</span></div><div className="project-meta"><span>{p[1]}</span><h3>{p[0]}</h3><p>{p[3]}</p></div></a>)}</div>}
function ClientWall(){return <section className="client-wall" data-reveal><div className="client-head"><p className="eyebrow">GOOD PEOPLE, AMBITIOUS BUSINESSES</p><h2>In good company.</h2></div><div className="client-grid">{clients.map(([name,img])=><div className="client-logo" key={name}><img src={'/assets/'+img} alt={name+' logo'}/><span>{name}</span></div>)}</div></section>}
function HomeHero(){
  return <section className="reference-hero aurem-reference">
    <div className="aurem-light" aria-hidden="true"/>
    <div className="aurem-reference-copy">
      <h1 className="page-enter">We make brands<br/>people <em>stop and</em><br/><em>notice.</em></h1>
      <p className="hero-summary page-enter">Adreks brings design, advertising and digital marketing together to make your brand easier to recognise, find and choose.</p>
      <div className="hero-actions page-enter">
        <Link className="primary-link" to="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        <Link className="aurem-secondary" to="/work">Explore our work ↗</Link>
      </div>
      <Link className="aurem-founder" to="/studio">Kavan Desai <span>Founder & creative strategist ↗</span></Link>
    </div>
    <div className="aurem-arch page-enter">
      <img src="/assets/kavan-desai.webp" alt="Kavan Desai, founder of Adreks"/>
      <Link className="aurem-stamp" to="/studio" aria-label="Meet the founder">ADREKS <b aria-hidden="true">↗</b> STUDIO</Link>
    </div>
    <div className="aurem-outline" aria-hidden="true">Adreks</div>
  </section>;
}

function ServiceShowcase({full=false}){
  return <div className="aurem-disciplines">
    {services.map(service=><details className="aurem-discipline" key={service.slug} name="adreks-disciplines">
      <summary>{service.title}<span aria-hidden="true">+</span></summary>
      <div className="aurem-discipline-body">
        <p>{service.short}</p>
        <ul>{service.deliverables.slice(0,full?6:4).map(item=><li key={item}>{item}</li>)}</ul>
        <Link className="inline-link" to={'/services/'+service.slug}>Explore this service ↗</Link>
      </div>
    </details>)}
  </div>;
}

function ProjectShowcase(){
  const [active,setActive]=useState(0);
  const [name,category,file,description]=projects[active];
  const previous=projects[(active+projects.length-1)%projects.length];
  const next=projects[(active+1)%projects.length];
  function move(offset){
    setActive(current=>(current+offset+projects.length)%projects.length);
  }
  return <div className="project-showcase aurem-reel">
    <div className="aurem-reel-sides" aria-hidden="true">
      <img src={'/assets/'+previous[2]} alt="" loading="lazy"/>
      <img src={'/assets/'+next[2]} alt="" loading="lazy"/>
    </div>
    <div className="showcase-project" key={file}>
      <img src={'/assets/'+file} alt={name+' — '+category} loading="lazy"/>
      <div><p className="eyebrow">{category}</p><h3>{name}</h3><p>{description}</p></div>
    </div>
    <div className="showcase-controls">
      <button type="button" onClick={()=>move(-1)} aria-label="Previous project">←</button>
      <span aria-live="polite">{active+1} / {projects.length}<span className="visually-hidden"> {name}</span></span>
      <button type="button" onClick={()=>move(1)} aria-label="Next project">→</button>
    </div>
  </div>;
}

function Home(){
  return <>
    <HomeHero/>
    <section className="reference-about" data-reveal>
      <div><p className="eyebrow">Advertising + Design · Reach + Engagement · Keep Scaling</p>
      <h2>About Adreks</h2></div>
      <div><p>We build brands, make the creative and manage the campaigns that put it in front of the right people. Led by Kavan Desai in Ahmedabad, Adreks works across social media, search, advertising and design.</p>
      <Link to="/studio" className="inline-link">Meet the studio ↗</Link></div>
    </section>
    <section className="reference-section reference-services">
      <div className="reference-section-head" data-reveal><h2>Services</h2><Link className="inline-link" to="/services">All services ↗</Link></div>
      <ServiceShowcase/>
    </section>
    <section className="reference-section reference-work">
      <div className="reference-section-head" data-reveal><h2>Selected work</h2><Link className="inline-link" to="/work">View portfolio ↗</Link></div>
      <ProjectShowcase/>
    </section>
    <ClientWall/>
    <CtaBand/>
  </>;
}
function Studio(){return <><PageTop eyebrow="THE STUDIO · THE PERSON · THE POINT OF VIEW" title={<>Independent by nature.<br/><em>Collaborative by choice.</em></>} description="Adreks is an advertising and design practice shaped around thoughtful creative, clear communication and the people behind the business."/><section className="studio-feature" data-reveal><div className="studio-photo"><img src="/assets/kavan-desai.webp" alt="Kavan Desai, digital marketer and creative strategist"/><span>KAVAN DESAI / DIGITAL & CREATIVE</span></div><div className="studio-story"><p className="eyebrow">A PERSON-FIRST PRACTICE</p><h2>Meet Kavan<br/><em>Desai.</em></h2><p>Kavan is a digital marketer and creative strategist who works across social media, advertising and design. Adreks is the studio for bringing those skills together—close collaboration, thoughtful work and a clear line from idea to execution.</p><p>From a social post to a brand identity or a paid campaign, each project starts by understanding the people the work needs to reach.</p><div className="studio-stats"><span><b>100+</b> designs created</span><span><b>10+</b> happy clients</span><span><b>1.5+</b> years experience</span></div><a className="inline-link" href={portfolio} target="_blank" rel="noreferrer">Explore Kavan’s full portfolio ↗</a></div></section><section className="principles"><p className="eyebrow">HOW WE THINK</p><div className="principle-grid"><article><span>01</span><h3>Start with people.</h3><p>Useful work begins with understanding the customer, not just the platform.</p></article><article><span>02</span><h3>Make it feel considered.</h3><p>Every visual and every word should have a reason to be there.</p></article><article><span>03</span><h3>Keep learning.</h3><p>Notice what connects, share what we learn and use it to make the next round stronger.</p></article></div></section><CtaBand compact/></>}
function ServicesIndex(){return <><PageTop eyebrow="SERVICES · STRATEGY THROUGH EXECUTION" title={<>A connected set<br/>of <em>growth services.</em></>} description="From the way your brand looks to the way it gets found, followed and chosen, Adreks brings the right creative and marketing work together."/><section className="services-index"><div className="service-intro-row"><p>Choose a service to see what’s included and how we approach it. Projects can start with one need or bring several of these disciplines together.</p><span>07 DISCIPLINES / ONE CREATIVE PARTNER</span></div><ServiceShowcase full/></section><section className="platform-ribbon"><p className="eyebrow">CHANNELS & FORMATS WE WORK ACROSS</p><div>INSTAGRAM <i>·</i> FACEBOOK <i>·</i> LINKEDIN <i>·</i> GOOGLE ADS <i>·</i> META ADS <i>·</i> SEARCH <i>·</i> PRINT <i>·</i> SHORT-FORM VIDEO</div></section><CtaBand compact/></>}
function ServiceDetail({slug}){const service=services.find(s=>s.slug===slug);if(!service)return <NotFound/>;return <><PageTop eyebrow={service.kicker} title={service.title} description={service.intro}/><div className="service-detail"><div className="detail-sidebar"><p className="eyebrow">ADREKS / SERVICE {String(services.indexOf(service)+1).padStart(2,'0')}</p><h2>{service.title}</h2><p>{service.short}</p><Link className="primary-link" to="/contact">Discuss this service <span>↗</span></Link><div className="related-services"><span>EXPLORE OTHER SERVICES</span>{services.filter(s=>s.slug!==slug).slice(0,4).map(s=><Link key={s.slug} to={'/services/'+s.slug}>{s.title} ↗</Link>)}</div></div><div className="detail-main"><section><p className="eyebrow">WHAT’S INCLUDED</p><h2>Thought through.<br/><em>Ready to use.</em></h2><div className="deliverables">{service.deliverables.map((item,i)=><div key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div></section><section className="detail-process"><p className="eyebrow">HOW WE WORK</p><div>{service.steps.map(([n,title,copy])=><article key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section><section className="good-fit"><p className="eyebrow">BUILT AROUND YOUR BUSINESS</p><p>We’ll shape the scope around your audience, current materials and goals. We’ll agree the deliverables and review points before the work begins.</p></section></div></div><CtaBand compact/></>}
function Work(){return <><PageTop eyebrow="COMPANY PORTFOLIO · SELECTED PROJECTS" title={<>Good ideas,<br/><em>out in the world.</em></>} description="A selection of campaign, social and print work from Kavan’s portfolio. Each project starts with the needs of its audience and the character of its brand."/><section className="work-page"><ProjectShowcase/><ProjectGrid/><a href={portfolio+'#work'} className="portfolio-link" target="_blank" rel="noreferrer">See every project in Kavan’s full portfolio ↗</a></section><ClientWall/><CtaBand compact/></>}
function Contact(){return <><PageTop eyebrow="CONTACT · PROJECT ENQUIRIES" title={<>Have something<br/>good in <em>mind?</em></>} description="Tell us what you’re working on, what you want to change, or where you want to grow. We’ll start with a conversation."/><section className="contact-page"><div className="contact-steps"><article><span>01</span><div><h3>Share the brief</h3><p>Tell us a little about your business, your audience and what you need help with.</p></div></article><article><span>02</span><div><h3>Find the right scope</h3><p>We’ll talk through the challenge and identify the services that make sense.</p></div></article><article><span>03</span><div><h3>Make a plan</h3><p>Agree deliverables, timing and the next steps before we begin the work.</p></div></article></div><div className="contact-card"><p className="eyebrow">START A CONVERSATION</p><h2>Let’s make<br/><em>something matter.</em></h2><p>Adreks is led by Kavan Desai in Ahmedabad and works with businesses locally and remotely.</p><a className="primary-link" href={portfolio+'#contact'} target="_blank" rel="noreferrer">Contact Kavan via his portfolio <span>↗</span></a><small>For now, project enquiries go through Kavan’s existing portfolio contact page.</small></div></section><section className="brief-guide"><p className="eyebrow">A USEFUL FIRST NOTE</p><p>Share your website or social links, which service you’re interested in, what you want to improve, and any timing you already have in mind. You don’t need a polished brief to get started.</p></section></>}
function NotFound(){return <PageTop eyebrow="404 · NOT THE RIGHT PAGE" title={<>Let’s find<br/><em>the right one.</em></>} description="That page isn’t here. Explore Adreks services or return to the homepage."/>}
function App(){usePageMotion();const{pathname}=useLocation();let page;if(pathname==='/')page=<Home/>;else if(pathname==='/studio')page=<Studio/>;else if(pathname==='/services')page=<ServicesIndex/>;else if(pathname.startsWith('/services/'))page=<ServiceDetail slug={pathname.split('/')[2]}/>;else if(pathname==='/work')page=<Work/>;else if(pathname==='/contact')page=<Contact/>;else page=<NotFound/>;return <div className={'site site-'+variant}><Header/><main className="route-content">{page}</main><Footer/></div>}
createRoot(document.getElementById('root')).render(<App/>);
