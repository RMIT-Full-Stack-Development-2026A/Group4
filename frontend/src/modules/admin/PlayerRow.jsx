import AdminService from "./AdminService";
import StatusBadge from "../../components/reusable/StatusBadge";

export default function PlayerRow({player, playerDispatch}) {
    async function updateStatus(newActiveStatus) {
        if (player.isActive === newActiveStatus) return;

        try {
            await AdminService.updatePlayerStatus(player.id, newStatus);

            playerDispatch({
                type: "UPDATE_STATUS",
                payload: {
                    targetID: player.id,
                    newActiveStatus,
                },
            });
        } catch (err) {
            alert(`Failed to change ${player.id}'s active status: ${err.message}`);    
        }
    }

    const activeBadge = player.isActive ? "active" : "deactivated"
    const premiumBadge = player.isPremium ? "premium" : "standard"
    return (
        <tr>
            <td className="table-body-cell text-left">{player.username}</td>
            <td className="table-body-cell text-left">{player.email}</td>
            <td className="table-body-cell text-center"><StatusBadge type={activeBadge}/></td>
            <td className="table-body-cell text-center"><StatusBadge type={premiumBadge}/></td>
            <td className="table-body-cell text-center">
                <button onClick={() => updateStatus(false)}>🔨</button>
                <button onClick={() => updateStatus(true)}>🔓</button>
            </td>
        </tr>
    )
}