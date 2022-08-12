import {FC} from "react";
import {optionType} from "../../pages/ProfileSettings";
import OptionsPanelItem from "./OptionsPanelItem";

const OptionsPanel: FC<{ options: optionType[]; onOptionSelected: (id: number) => void; selectedId: number }> = props => {
    return <div className={'flex flex-col w-[300px]'}>
        {props.options.map(o => <OptionsPanelItem selectedId={props.selectedId} key={o.id} option={o}
                                                  onOptionSelected={props.onOptionSelected}/>)}
    </div>
}

export default OptionsPanel;