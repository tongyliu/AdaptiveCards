#pragma once

#include "pch.h"
#include "BaseInputElement.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class TextInput : public BaseInputElement
{
public:
    TextInput();

    virtual std::string Serialize();
    Json::Value SerializeToJsonValue();

    std::string GetPlaceholder() const;
    void SetPlaceholder(const std::string value);

    std::string GetValue() const;
    void SetValue(const std::string value);

    bool GetIsMultiline() const;
    void SetIsMultiline(const bool value);

    unsigned int GetMaxLength() const;
    void SetMaxLength(const unsigned int value);

    TextInputStyle GetTextInputStyle() const;
    void SetTextInputStyle(const TextInputStyle value);

private:
    std::string m_placeholder;
    std::string m_value;
    bool m_isMultiline;
    unsigned int m_maxLength;
    TextInputStyle m_style;
};

class TextInputParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}