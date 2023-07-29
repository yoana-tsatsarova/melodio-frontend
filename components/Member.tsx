import Image from "next/legacy/image";
import Link from "next/link";
type Props = {
  name: string;
  bio: string;
  href: string;
  link: string;
};


function Member({name, bio,href, link }: Props) {
  return(
      <div className="text-sm">
        <div>{name}</div>
        <div >{bio}</div>
        <img src={href} alt={name}/>
        <div>{link}</div>
      </div>
  )
}

export default Member;
