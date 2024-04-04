import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {
    CircleStackIcon,
    Cog6ToothIcon,
    CubeTransparentIcon,
    EnvelopeIcon,
    Square3Stack3DIcon,
    UsersIcon,
} from "@heroicons/react/24/outline";
import Dashboard from "@components/Dashboard";
import {classNames} from "@util/ui";

const actions = [
    {
        title: "Message Director",
        href: "/md",
        icon: EnvelopeIcon,
        iconForeground: "text-teal-700",
        iconBackground: "bg-teal-50",
        description:
            "The Message Director interface for this Ardos instance. Includes listen, connect, and connected participant details.",
    },
    {
        title: "Client Agent",
        href: "/ca",
        icon: UsersIcon,
        iconForeground: "text-purple-700",
        iconBackground: "bg-purple-50",
        description:
            "The Client Agent details for this Ardos instance. Includes listen and connected participant information.",
    },
    {
        title: "State Server",
        href: "/ss",
        icon: Square3Stack3DIcon,
        iconForeground: "text-sky-700",
        iconBackground: "bg-sky-50",
        description: "Contains information about the state various Distributed Object's are in on this Ardos instance.",
    },
    {
        title: "Database",
        href: "/db",
        icon: CircleStackIcon,
        iconForeground: "text-yellow-700",
        iconBackground: "bg-yellow-50",
        description:
            "Contains information about or connected MongoDB instance and allocate channel range for DoId generation.",
    },
    {
        title: "Database State Server",
        href: "/dbss",
        icon: CubeTransparentIcon,
        iconForeground: "text-rose-700",
        iconBackground: "bg-rose-50",
        description: "A specialized type of State Server that handles long-term persistence of fields marked as 'DB'.",
    },
    {
        title: "Config",
        href: "/config",
        icon: Cog6ToothIcon,
        iconForeground: "text-indigo-700",
        iconBackground: "bg-indigo-50",
        description: "The configuration file this Ardos instance has been loaded with.",
    },
];

export default function Home() {
    return (
        <Dashboard>
            <Helmet>
                <title>Home | Ardos</title>
            </Helmet>

            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                {actions.map((action, actionIdx) => (
                    <div
                        key={action.title}
                        className={classNames(
                            actionIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
                            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
                            actionIdx === actions.length - 1 ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none" : "",
                            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500",
                        )}
                    >
                        <div>
                            <span
                                className={classNames(
                                    action.iconBackground,
                                    action.iconForeground,
                                    "inline-flex rounded-lg p-3 ring-4 ring-white",
                                )}
                            >
                                <action.icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-base font-semibold leading-6 text-gray-900">
                                <Link to={action.href} className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    {action.title}
                                </Link>
                            </h3>
                            <p className="mt-2 text-sm text-gray-500">{action.description}</p>
                        </div>
                        <span
                            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
                            aria-hidden="true"
                        >
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>
        </Dashboard>
    );
}
