import React from 'react';

interface ImageLinkProps {
    src: string;
    alt: string;
}

const ImageLink  = ({ src, alt }: ImageLinkProps) => (
    <a href="/#">
        <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={src} alt={alt} />
    </a>
);

type SocialLinkProps = {
    href: string;
    children: React.ReactNode;
};

const SocialLink: React.FC<SocialLinkProps> = ({ href, children }) => {
    return (
        <li>
            <a href={href} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                {children}
            </a>
        </li>
    );
};

interface Social {
    href: string;
    icon: React.ReactNode;
}

interface TeamMemberProps {
    image: {
        src: string;
        alt: string;
    };
    name: string;
    role: string;
    description: string;
    socials: Social[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ image, name, role, description, socials }) => (
    <div className="items-center h-screen  bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
        <ImageLink {...image} />
        <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="/#">{name}</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">{role}</span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{description}</p>
            <ul className="flex space-x-4 sm:mt-0">
                {socials.map((social) => (
                    <SocialLink key={social.href} href={social.href}>
                        {social.icon}
                    </SocialLink>
                ))}
            </ul>
        </div>
    </div>
);

const MeetTheTeamSection = () => {

    const teamMembers: TeamMemberProps[] = [
        {
            image: {
                src: "some_image_source1",
                alt: "some_alt_text1",
            },
            name: "Member1",
            role: "Role1",
            description: "Description1",
            socials: [
                {
                    href: "social_link1",
                    icon: <div>Icon1</div>, // replace with your actual icon component
                },
            ],
        },
        {
            image: {
                src: "some_image_source2",
                alt: "some_alt_text2",
            },
            name: "Member2",
            role: "Role2",
            description: "Description2",
            socials: [
                {
                    href: "social_link2",
                    icon: <div>Icon2</div>, // replace with your actual icon component
                },
            ],
        },
        // More team members here...
    ];

    return (
        <>
            <section className="flex min-h-screen items-center justify-center mx-auto">
                <section className="bg-white dark:bg-gray-900">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                                Our Team
                            </h2>
                            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
                                Explore the whole collection of open-source web components and elements built with the utility
                                classes from Tailwind
                            </p>
                        </div>
                        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
                            {teamMembers.map((member) => (
                                <TeamMember key={member.name} {...member} />
                            ))}
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default MeetTheTeamSection;
