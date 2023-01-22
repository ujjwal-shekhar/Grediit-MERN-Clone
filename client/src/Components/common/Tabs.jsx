import React from 'react';

const Tabs = ({ activeTab, onTabChange, children }) => {
    const handleTabClick = (tab) => {
        onTabChange(tab);
    };

    return (
        <div>
            <div>
                {children.map((child) => {
                    return (
                        <button
                            key={child.props.label}
                            onClick={() => handleTabClick(child.props.label)}
                            disabled={child.props.label === activeTab}
                        >
                            {child.props.label}
                        </button>
                    );
                })}
            </div>
            <div>
                {children.map((child) => {
                    if (child.props.label !== activeTab) return null;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

export default Tabs;
