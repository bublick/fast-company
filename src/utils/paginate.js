import _ from "lodash";
export function paginate(allUsers, currentPage, usersPerPage) {
    const startIndex = (currentPage - 1) * usersPerPage;

    return _(allUsers).slice(startIndex).take(usersPerPage).value();
}
