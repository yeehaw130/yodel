// socialService.js

const followUserHelper = async (userId, targetUserId) => {
    // add follower to target user
    const targetDocRef = db.collection('users').doc(targetUserId);
    const targetFollowers = await targetDocRef.get('followers');
    await targetDocRef.update({
        followers: [...targetFollowers, followerId]
    });

    // add following to user
    const userDocRef = db.collection('users').doc(userId);
    const userFollowings = await userDocRef.get(following);
    await userDocRef.update({
        following: [...userFollowings, followingId]
    });
};

const followUser = async (userId, targetUserId) => {
    const targetDocRef = db.collection('users').doc(targetUserId);
    const targetIsPublic = await targetDocRef.get('isPublic');
    if (!targetIsPublic) {
        // add followrequest to target user
        const targetFollowRequests = targetData.followRequests || [];
        await targetDocRef.update({
            followRequests: [...targetFollowRequests, userId]
        });
    }
    else {
        followUserHelper(userId, targetUserId);
    }

};

const acceptFollowRequest = async (userId, followId) => {
    // remove follow request from user
    const userDocRef = db.collection('users').doc(userId);
    const userFollowRequests = await userDocRef.get();
    
    await userDocRef.update({
        followRequests: userFollowRequests.filter(request => request !== followId)
    });

    followUserHelper(userId, followId);
};

const unfollowUser = async (userId, targetUserId) => {
    const userDocRef = db.collection('users').doc(userId);
    const userFollowings = await userDocRef.get('following');

    // see if user is following target
    if (!userFollowings.includes(targetUserId)) {
        throw new Error('User is not following target');
    }

    // remove follower from target user
    const targetDocRef = db.collection('users').doc(targetUserId);
    const targetFollowers = await targetDocRef.get('followers');
    await targetDocRef.update({
        followers: targetFollowers.filter(follower => follower !== userId)
    });

    // remove following from user
    await userDocRef.update({
        following: userFollowings.filter(following => following !== targetUserId)
    });
};

const sharePlaylist = async (senderId, receiverId, playlistId) => {
    // Logic to share a playlist
};

const getUserActivity = async (userId) => {
    // Logic to get recent activity of friends
};

const getFollowers = async (userId) => {
    const docRef = db.collection('users').doc(userId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Document does not exist');
    }
    const followers = docSnapshot.get("followers");
    return followers;
};

const getFollowing = async (userId) => {
    const docRef = db.collection('users').doc(userId);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
        throw new Error('Document does not exist');
    }
    const following = docSnapshot.get("following");
    return following;
}

module.exports = {
    followUser,
    acceptFollowRequest,
    unfollowUser,
    sharePlaylist,
    getUserActivity,
    getFollowers,
    getFollowing
};