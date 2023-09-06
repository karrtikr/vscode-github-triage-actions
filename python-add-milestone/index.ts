/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { OctoKitIssue } from '../api/octokit';
import { Action } from '../common/Action';
import { GitHubIssue } from '../api/api';

class PythonAddMilestoneAction extends Action {
	id = 'PythonAddMilestoneAction';

	async onClosed(issue: OctoKitIssue) {
		await enrollIssue(issue);
	}
}

const enrollIssue = async (issue: GitHubIssue) => {
	const closingHash = (await issue.getClosingInfo())?.hash;
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
