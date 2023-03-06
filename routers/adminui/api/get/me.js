const db = require('../../../../database/index');
module.exports = async function (req, res) {
    if (req.session.userid == null) {
        return res.status(401).json({});
    }
    const user = await db.lookup('User', req.session.userid);
    if (user==null) {
        await req.session.destroy()
        return res.status(401).json({});
    }
    return res.status(200).json({
        id: user.id,
        username: user.username,
        email:user.email,
        avatar: user.avatar,
        discord: {
            id: user.DiscordLinkId,
            username: user.DiscordLinkUsername,
            avatar: user.DiscordLinkAvatar
        },
        github: {
            id: user.GithubLinkId,
            username: user.GithubLinkUsername,
            avatar: user.GithubLinkAvatar
        },
    });
}