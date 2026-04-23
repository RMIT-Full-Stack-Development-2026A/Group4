export default function PlayerRow({player, playerDispatch}) {
    async function banPlayer() {
        if (player.isActive) {
            try {
                // call to update backend
                await AdminService.updatePlayerStatus(player.id, false);

                // update UI
                playerDispatch({
                    type: "UPDATE_STATUS",
                    payload: { targetID: player.id, newStatus: false },
                });
            } catch (err) {
                alert("Failed to ban player: " + err.message);
            }
        }
    }

    async function unbanPlayer() {
        if (!player.isActive) {
            try {
                // call to update backend
                await AdminService.updatePlayerStatus(player.id, true);

                // update UI
                playerDispatch({
                    type: "UPDATE_STATUS",
                    payload: { targetID: player.id, newStatus: true },
                });
            } catch (err) {
                alert("Failed to unban player: " + err.message);
            }
        }
    }
    return (
        <tr>
            <td className="table-body-cell text-left">{player.username}</td>
            <td className="table-body-cell text-left">{player.email}</td>
            <td className="table-body-cell text-center">{player.isPremium}</td>
            <td className="table-body-cell text-center">{player.isActive}</td>
            <td className="table-body-cell text-center">
                <button onClick={banPlayer}>🔨</button>
                <button onClick={unbanPlayer}>🔓</button>
            </td>
        </tr>
    )
}