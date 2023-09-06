"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const Action_1 = require("../common/Action");
class PythonAddMilestoneAction extends Action_1.Action {
    constructor() {
        super(...arguments);
        this.id = 'PythonAddMilestoneAction';
    }
    async onClosed(issue) {
        await enrollIssue(issue);
    }
}
const enrollIssue = async (issue) => {
    var _a;
    const closingHash = (_a = (await issue.getClosingInfo())) === null || _a === void 0 ? void 0 : _a.hash;
    console.log('Closing hash', closingHash);
    if (closingHash) {
        // Get the milestone linked to the current release and set it if the issue doesn't have one
        const releaseMilestone = (await issue.getIssue()).milestone
            ? undefined
            : await issue.getCurrentRepoMilestone();
        if (releaseMilestone !== undefined) {
            await issue.setMilestone(releaseMilestone);
        }
    }
};
//# sourceMappingURL=index.js.map