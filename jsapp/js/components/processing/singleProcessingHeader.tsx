import React from 'react';
import bem from 'js/bem';
import {QuestionTypeName} from 'js/constants';
import TextBox, {AvailableType} from 'js/components/common/textBox';

bem.SingleProcessingHeader = bem.create('single-processing-header', 'header');

/**
 * this.props.params properties
 */
type SingleProcessingHeaderProps = {
  questionType: QuestionTypeName | undefined
  questionName: string
  submissionId: string
  submissionsIds: string[]
}

/**
 * This route component is being loaded with PermProtectedRoute so we know that
 * the call to backend to get asset was already made :happy_face:
 */
export default class SingleProcessingHeader extends React.Component<SingleProcessingHeaderProps, {}> {
  constructor(props: SingleProcessingHeaderProps) {
    super(props);
  }

  onDone(evt: React.MouseEvent<HTMLButtonElement>) {
    console.log(evt)
  }

  onSubmissionIndexInputChange(newValue: string) {
    console.log(newValue);
  }

  /**
   * Returns the natural number (first is 1, not 0)
   */
  getCurrentSubmissionNumber(): number {
    return this.props.submissionsIds.indexOf(this.props.submissionId) + 1
  }

  render() {
    return (
      <bem.SingleProcessingHeader>
        <div>icon in a colorful square: {this.props.questionType}</div>

        <div>
          {this.getCurrentSubmissionNumber()} of {this.props.submissionsIds.length}
          {t('Q: ##question_name##').replace('##question_name', this.props.questionName)}
        </div>

        <div>
          <bem.KoboLightButton>
            {t('< prev')}
          </bem.KoboLightButton>

          <TextBox
            type={AvailableType.number}
            value={String(this.getCurrentSubmissionNumber())}
            onChange={this.onSubmissionIndexInputChange.bind(this)}
          />

          <bem.KoboLightButton>
            {t('next >')}
          </bem.KoboLightButton>
        </div>

        <div>
          <bem.KoboLightButton m='blue' onClick={this.onDone.bind(this)}>
            {t('Done')}
          </bem.KoboLightButton>
        </div>
      </bem.SingleProcessingHeader>
    )
  }
}
