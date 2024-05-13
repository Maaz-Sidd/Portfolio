"use client";

function NavbarLink({text = '', link = '', border = false}){
    return (
        <>
            <a className={`text-sm sm:text-md header-link transition hover:text-[#a5867E] m-2 p-[10px] text-center rounded-[100px] text-white ${
        border ? "border border-[#a58c7e]" : ""} `} href={link}>
                {text}
            </a>
        </>
    )
}

export function Navbar() {
 // const [active, setActive] = useState<string | null>(null);
  //setActive('Home');

  const navLinks = [
    { text: 'Home',        link: '#home' },
    { text: 'About',        link: '#about' },
    { text: 'Projects',     link: '#projects'},
    { text: 'Experiences',  link: '#experiences'},
    { text: 'Contact',      link: '#contact', border: true},
]
  return (
    <div className="relative w-full flex items-center justify-center">
        <div className={`fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 flex items-center justify-center `} >
            <div className=" bg-[#0b0d0e] border-[#a58c7e] border rounded-[100px] flex items-center justify-center shadow">
                            {navLinks.map((navLink, index)=>{
                                return (
                                    <NavbarLink key={index} text={navLink.text} link={navLink.link} border={navLink.border}/>
                                )
                            })}
            </div>
        </div>
    </div>
  );
}
