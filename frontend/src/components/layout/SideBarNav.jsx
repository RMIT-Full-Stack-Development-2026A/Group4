import NavConfig from "../../config/navConfig"

export default function SideBarNav() {
    return (
        <nav className="w-full mt-2 overflow-y-auto min-h-0 flex-1">
            {NavConfig[role]?.map((item, index) => {
                if (item.type === "link") {
                    return <Link key={index} to={item.path} className="text-sm text-black">
                            {item.label}
                            </Link>
                }
                else if (item.type === "section") {
                    return <CollapsibleBox key={index} title={item.title}>
                            {item.children.map((subLink, subIndex) => (
                                <Link 
                                    key={subIndex}
                                    to={subLink.path} 
                                    className="text-sm text-black"
                                >
                                    {subLink.label}
                                </Link>
                            ))}
                            </CollapsibleBox>
                }
            })}
        </nav>
    )
}