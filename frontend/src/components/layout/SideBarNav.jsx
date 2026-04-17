import NavConfig from "../../config/navConfig"

export default function SideBarNav() {
    return (
        <nav className="w-full mt-2">
            {NavConfig[role]?.map((item, index) => {
                if (item.type == "link") {
                    return <Link key={index} to={item.path} className="text-sm text-black">
                            {item.label}
                            </Link>
                }
                else if (item.type == "section") {
                    return <CollapsibleBox title={item.title}>
                            {item.children.map((subLink, subIndex) => {
                                return <Link 
                                            key={subIndex}
                                            to={subLink.path} 
                                            className="text-sm text-black">
                                        {subLink.label}
                                        </Link>
                            })}
                            </CollapsibleBox>
                }
            })}
        </nav>
    )
}