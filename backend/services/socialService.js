// socialService.js
const { db } = require('../config/firebaseConfig');

const followUser = async (userId, targetUserId) => {
    const followid = userId + targetUserId;
    
    const followRef = db.collection('follows').doc(followid);
    const follow = await followRef.get();
    if (follow.exists) {
        throw new Error('Follow already exists');
    }

    const followData = {
        follower: userId,
        following: targetUserId,
        createdAt: db.Timestamp.now(),
        status: "pending"
    };
    await followRef.set(followData);

    // if target user is public, follow immediately
    const targetUserRef = db.collection('users').doc(targetUserId);
    const targetUserPublic = await targetUserRef.get("isPublic");
    if (targetUserPublic) {
        followData = await acceptFollowRequest(followid);
    }

    return followData;
};

const acceptFollowRequest = async (followId) => {
    const followDocRef = db.collection('follows').doc(followId);
    const follow = await followDocRef.get();
    if (!follow.exists) {
        throw new Error('Follow request does not exist');
    }
    if (follow.data().status === "active") {
        throw new Error('Follow request already accepted');
    }
    await followDocRef.update({status: "active"});

    // increment follower count for target user
    const targetDocRef = db.collection('users').doc(follow.data().following);
    await targetDocRef.update({
        followers: db.FieldValue.increment(1)
    });

    // increment following count for follower
    const followerDocRef = db.collection('users').doc(follow.data().follower);
    await followerDocRef.update({
        following: db.FieldValue.increment(1)
    });

    return follow.data();
};

const handleFollowRequest = async (followId, accept) => {
    if (accept) {
        return acceptFollowRequest(followId);
    } else {
        const followDocRef = db.collection('follows').doc(followId);
        await followDocRef.delete();
        return {};
    }
}

const unfollowUser = async (userId, targetUserId) => {
    const followId = userId + targetUserId;
    const followDocRef = db.collection('follows').doc(followId);
    const follow = await followDocRef.get();
    if (!follow.exists) {
        throw new Error('Follow does not exist');
    }
    if (follow.data().status === "active") {
        // decrement follower count for target user
        const targetDocRef = db.collection('users').doc(targetUserId);
        await targetDocRef.update({
            followers: db.FieldValue.increment(-1)
        });

        // decrement following count for follower
        const followerDocRef = db.collection('users').doc(userId);
        await followerDocRef.update({
            following: db.FieldValue.increment(-1)
        });
    }

    await followDocRef.delete();
    return {};
};

const sharePlaylist = async (senderId, receiverId, playlistId) => {
    // Logic to share a playlist
};

const getUserActivity = async (userId) => {
    // Logic to get recent activity of friends
};

const getFollowers = async (userId) => {
    const docRef = db.collection('follows').where('following', '==', userId).where('status', '==', 'active');
    const docSnapshot = await docRef.get();
    const followers = [];
    docSnapshot.forEach(doc => {
        followers.push(doc.data().follower);
    });
    return followers;
};

const getFollowing = async (userId) => {
    const docRef = db.collection('follows').where('follower', '==', userId).where('status', '==', 'active');
    const docSnapshot = await docRef.get();
    const following = [];
    docSnapshot.forEach(doc => {
        following.push(doc.data().following);
    });
    return following;
}

const getFollowRequests = async (userId) => {
    const docRef = db.collection('follows').where('following', '==', userId).where('status', '==', 'pending');
    const docSnapshot = await docRef.get();
    const requests = [];
    docSnapshot.forEach(doc => {
        requests.push(doc.data().follower);
    });
    return requests;
}

module.exports = {
    followUser,
    handleFollowRequest,
    unfollowUser,
    sharePlaylist,
    getUserActivity,
    getFollowers,
    getFollowing,
    getFollowRequests,
};