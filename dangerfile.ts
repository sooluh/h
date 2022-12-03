import {message, danger} from 'danger';

const modified = danger.git.modified_files.join('\n- ');
message('Changed files in this PR: \n - ' + modified);
