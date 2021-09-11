
export function paginate(allUsers, currentPage, usersPerPage) {
    const startIndex = (currentPage - 1) * usersPerPage;

    return allUsers.slice(startIndex, startIndex + usersPerPage);
}
