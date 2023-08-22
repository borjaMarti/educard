const Breadcrumbs = ({ children }) => {
  let multiple = Array.isArray(children);

  return (
    <nav aria-label="Breadcrumb">
      <ol>
        {multiple ? (
          children.map((child, index) => {
            if (index === children.length - 1) {
              return <li key={child.props["href"]}>{child}</li>;
            } else
              return (
                <li key={child.props["href"]}>
                  {child}
                  <span aria-hidden="true">/</span>
                </li>
              );
          })
        ) : (
          <li key={children.props["href"]}>{children}</li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
