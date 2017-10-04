#pragma once

#include "pch.h"
#include "BaseInputElement.h"
#include "ChoiceInput.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class BaseInputElement;
class ChoiceSetInput : public BaseInputElement
{
friend class ChoiceSetInputParser;
public:
    ChoiceSetInput();
    ChoiceSetInput(Spacing spacing, bool separation);
    ChoiceSetInput(Spacing spacing, bool separation, std::vector<std::shared_ptr<ChoiceInput>>& choices);

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    bool GetIsMultiSelect() const;
    void SetIsMultiSelect(const bool isMultiSelect);

    ChoiceSetStyle GetChoiceSetStyle() const;
    void SetChoiceSetStyle(const ChoiceSetStyle choiceSetStyle);

    std::vector<std::shared_ptr<ChoiceInput>>& GetChoices();
    const std::vector<std::shared_ptr<ChoiceInput>>& GetChoices() const;

private:
    bool m_isMultiSelect;
    ChoiceSetStyle m_choiceSetStyle;

    std::vector<std::shared_ptr<ChoiceInput>> m_choices; 
};

class ChoiceSetInputParser : ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}