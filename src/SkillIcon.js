import IconCover from "./skill_icons/icon_cover_40.png"
const requireContext = require.context("./skill_icons", true, /^\.\/.*\.png$/);

export const SkillIcon = (props) => {
    return (
        <div style={{
            display: 'inline',
            width: '48px',
            height: '48px',
        }}>
            <img
                style={{
                    top: '2px',
                    left: '4px',
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                }}
                src={requireContext(`./${props.skill}.png`).default}  alt={"inner_quiet"}
            />
            <div style={{
                top: 0,
                left: 0,
                width: '48px',
                height: '48px',
                position: 'absolute',
                background: `url(${IconCover}) center center / cover no-repeat`
            }}/>
        </div>
    );
}