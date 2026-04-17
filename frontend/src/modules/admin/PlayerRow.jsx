export default function PlayerRow({player}) {
    return (
        <tr>
            <td className="table-body-cell text-left">{player.username}</td>
            <td className="table-body-cell text-left">{player.email}</td>
            <td className="table-body-cell text-center">{player.isPremium}</td>
            <td className="table-body-cell text-center">{player.isActive}</td>
            <td className="table-body-cell text-center">
                <button onClick={}>🔨</button>
                <button onClick={}>🔓</button>
            </td>
        </tr>
    )
}