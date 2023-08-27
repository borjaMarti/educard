const Breadcrumbs = ({ children }) => {
  let multiple = Array.isArray(children);

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__container">
        {multiple ? (
          children.map((child, index) => {
            if (index === children.length - 1) {
              return <li key={child.props["href"]}>{child}</li>;
            } else
              return (
                <li key={child.props["href"]} className="breadcrumb__element">
                  {child}
                  <span aria-hidden="true" className="breadcrumb__separator">
                    /
                  </span>
                </li>
              );
          })
        ) : (
          <li key={children.props["href"]} className="breadcrumb__element">
            {children}
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
