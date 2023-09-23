export interface Context {
    handleResubmit: React.MouseEventHandler<HTMLLIElement>;
    handleAccept: React.MouseEventHandler<HTMLLIElement>;
    handleReject: React.MouseEventHandler<HTMLLIElement>;
    handleGiveRemarks: React.MouseEventHandler<HTMLLIElement>;
}