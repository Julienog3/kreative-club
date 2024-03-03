import { useCategories } from "#root/src/api/categories/getCategories";
import { css } from "#root/styled-system/css";
import { hstack, vstack } from "#root/styled-system/patterns";
import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { Category } from "#root/types/category";
import Chip from "../Chip/Chip";
import Button from "../Button/Button";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export const Autocomplete = forwardRef<
  HTMLInputElement,
  ControllerRenderProps<FieldValues, "categories">
>(({ value, onChange }, ref) => {
  const { data: categories } = useCategories();
  const [suggestionValue, setSuggestionValue] = useState<string>("");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Category[]>([]);

  // if (!categories) return;

  const filteredCategories = categories?.filter((category) => {
    if (selectedValues.includes(category)) {
      return false;
    }
    return category.title
      .trim()
      .toLowerCase()
      .includes(suggestionValue.trim().toLowerCase());
  });

  const removeSelectedValue = (valueId: number) => {
    const newSelectedValues = selectedValues.filter(({ id }) => valueId !== id);
    onChange(newSelectedValues);
    setSelectedValues(newSelectedValues);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsExpanded(true);
    setSuggestionValue(e.target.value);
  };

  useEffect(() => {
    if (categories) {
      setSelectedValues(
        categories?.filter((category) => value.includes(category.id)),
      );
    }
  }, []);

  return (
    <>
      <div className={hstack({ alignItems: "center", mb: ".5rem" })}>
        <input
          type="text"
          role="combobox"
          id="categories"
          ref={ref}
          className={css({
            textStyle: "body",
            p: ".5rem",
            border: "solid 2px black",
            rounded: "10px",
          })}
          aria-expanded="false"
          tabIndex={0}
          value={suggestionValue}
          onChange={(e) => handleChange(e)}
        />
        <Button onClick={(): void => setIsExpanded((value) => !value)}>
          {isExpanded ? "toggled" : "not toggled"}
        </Button>
      </div>
      {selectedValues && (
        <ul
          id="categorytypes"
          role="listbox"
          aria-label="Categories"
          className={hstack({ alignItems: "start", mb: "1rem" })}
        >
          {selectedValues.map((selectedValue) => (
            <li role="option" key={selectedValue.id}>
              <Chip>
                {selectedValue.title}{" "}
                <button
                  onClick={(): void => removeSelectedValue(selectedValue.id)}
                >
                  x
                </button>
              </Chip>
            </li>
          ))}
        </ul>
      )}
      {isExpanded && filteredCategories && filteredCategories?.length > 0 && (
        <ul
          className={vstack({
            border: "solid 2px black",
            rounded: "10px",
            gap: "0",
            overflow: "hidden",
          })}
        >
          {filteredCategories.map((category, index) => (
            <li
              key={category.id}
              className={hstack({
                textStyle: "body",
                p: ".5rem",
                justifyContent: "space-between",
                borderBottom:
                  index === filteredCategories.length - 1
                    ? ""
                    : "solid 2px black",
                width: "100%",
                cursor: "pointer",
                _hover: {
                  backgroundColor: "gray",
                },
              })}
              onClick={(): void => {
                setSelectedValues((selectedValues) => [
                  ...selectedValues,
                  category,
                ]);
                onChange([...value, category.id]);
                setIsExpanded(false);
              }}
            >
              {category.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

Autocomplete.displayName = "Autocomplete";
