export default function PlayerRow({player, playerDispatch}) {
    // for code readability
    function banPlayer() {
        playerDispatch({
            type: "UPDATE_STATUS",
            payload: {
                targetID: player.id,
                newStatus: false,
            },
        });
    }

    function unbanPlayer() {
        playerDispatch({
            type: "UPDATE_STATUS",
            payload: {
                targetID: player.id,
                newStatus: true,
            },
        });
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