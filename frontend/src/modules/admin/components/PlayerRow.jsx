import AdminService from "../service/AdminService";
import StatusBadge from "../../../components/reusable/StatusBadge";

export default function PlayerRow({player, onToggle}) {

    const activeBadge = player.isActive ? "active" : "deactivated"
    const premiumBadge = player.isPremium ? "premium" : "standard"
    return (
        <tr>
            <td className="table-body-cell text-left">{player.username}</td>
            <td className="table-body-cell text-left">{player.email}</td>
            <td className="table-body-cell text-center"><StatusBadge type={premiumBadge}/></td>
            <td className="table-body-cell text-center"><StatusBadge type={activeBadge}/></td>
            <td className="table-body-cell text-center">
                <button onClick={() => onToggle(player.id, false)}>🔨</button>
                <button onClick={() => onToggle(player.id, true)}>🔓</button>
            </td>
        </tr>
    )
}