import React, {FormEvent, Fragment, useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Dialog, Transition} from "@headlessui/react";
import {
    Bars3Icon,
    CircleStackIcon,
    Cog6ToothIcon,
    CubeTransparentIcon,
    EnvelopeIcon,
    HomeIcon,
    MoonIcon,
    Square3Stack3DIcon,
    SunIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {ServerIcon} from "@heroicons/react/20/solid";
import ThemeContext from "@context/ThemeContext";
import WsContext from "@context/WsContext";
import SymbolLogo from "../img/SymbolLogo.png";

const navigation = [
    {name: "Home", href: "/", icon: HomeIcon},
    {name: "Message Director", href: "/md", icon: EnvelopeIcon},
    {name: "Client Agent", href: "/ca", icon: UsersIcon},
    {name: "State Server", href: "/ss", icon: Square3Stack3DIcon},
    {name: "Database", href: "/db", icon: CircleStackIcon},
    {name: "Database State Server", href: "/dbss", icon: CubeTransparentIcon},
    {name: "Config", href: "/config", icon: Cog6ToothIcon},
];

export default function Dashboard({children}: Readonly<{children: React.ReactNode}>) {
    const {theme, setTheme} = useContext(ThemeContext);
    const {disconnect, name} = useContext(WsContext);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    function toggleDarkMode(e: FormEvent) {
        e.preventDefault();

        setTheme(theme === "dark" ? "light" : "dark");
    }

    function handleDisconnect(e: FormEvent) {
        e.preventDefault();

        disconnect?.();
    }

    return (
        <div className="min-h-screen bg-gray-300 dark:bg-gray-700">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button
                                            type="button"
                                            className="-m-2.5 p-2.5"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img className="h-8 w-auto" src={SymbolLogo} alt="Ardos Logo" />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                to={item.href}
                                                                className={
                                                                    "text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
                                                                }
                                                            >
                                                                <item.icon
                                                                    className="h-6 w-6 shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img className="h-12 w-auto" src={SymbolLogo} alt="Ardos Logo" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.href}
                                                className={
                                                    "text-gray-400 hover:text-white hover:bg-gray-800 group flex gap-x-3 rounded-md p-2 text-lg leading-6 font-semibold"
                                                }
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="lg:pl-72">
                <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-800 bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                        <div className="relative flex flex-1">
                            <ServerIcon
                                className="pointer-events-none absolute inset-y-0 left-0 h-full w-8 text-gray-400"
                                aria-hidden="true"
                            />
                            <div className={"block pl-10 text-lg font-extrabold text-white my-auto"}>
                                Server Name: {name}
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4 lg:gap-x-6">
                            <button
                                type="button"
                                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                                onClick={toggleDarkMode}
                            >
                                <span className="sr-only">Toggle dark mode</span>
                                {theme === "dark" ? (
                                    <SunIcon className="h-8 w-8" aria-hidden="true" />
                                ) : (
                                    <MoonIcon className="h-8 w-8" aria-hidden="true" />
                                )}
                            </button>

                            {/* Separator */}
                            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                            <div>
                                <button
                                    type="button"
                                    className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleDisconnect}
                                >
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
