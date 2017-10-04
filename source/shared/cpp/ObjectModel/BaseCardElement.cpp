#include "BaseCardElement.h"
#include "ShowCardAction.h"
#include "OpenUrlAction.h"
#include "ParseUtil.h"
#include "SubmitAction.h"

using namespace AdaptiveCards;

const std::unordered_map<ActionType, std::function<std::shared_ptr<BaseActionElement>(const Json::Value&)>, EnumHash> BaseCardElement::ActionParsers =
{
    { ActionType::OpenUrl, OpenUrlAction::Deserialize },
    { ActionType::ShowCard, ShowCardAction::Deserialize },
    { ActionType::Submit, SubmitAction::Deserialize },
};

BaseCardElement::BaseCardElement(
    CardElementType type,
    Spacing spacing,
    bool separator) :
    m_type(type),
    m_spacing(spacing),
    m_separator(separator)
{
}

BaseCardElement::BaseCardElement(CardElementType type) :
    m_type(type), m_spacing(Spacing::Default)
{
}

AdaptiveCards::BaseCardElement::~BaseCardElement()
{
}

bool BaseCardElement::GetSeparator() const
{
    return m_separator;
}

void BaseCardElement::SetSeparator(const bool value)
{
    m_separator = value;
}

Spacing BaseCardElement::GetSpacing() const
{
    return m_spacing;
}

void BaseCardElement::SetSpacing(const Spacing value)
{
    m_spacing = value;
}

std::string BaseCardElement::GetId() const
{
    return m_id;
}

void BaseCardElement::SetId(const std::string value)
{
    m_id = value;
}

const CardElementType AdaptiveCards::BaseCardElement::GetElementType() const
{
    return m_type;
}

Json::Value BaseCardElement::SerializeToJsonValue()
 {
    Json::Value root;
    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Type)] = CardElementTypeToString(GetElementType());
    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Spacing)] = SpacingToString(GetSpacing());
    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Separator)] = GetSeparator();
    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Id)] = GetId();

    /* Issue #629 to make separator an object
    Json::Value jsonSeparator;
    jsonSeparator[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Color)] = ForegroundColorToString(GetSeparator()->GetColor());
    jsonSeparator[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Thickness)] = SeparatorThicknessToString(GetSeparator()->GetThickness());

    root[AdaptiveCardSchemaKeyToString(AdaptiveCardSchemaKey::Separator)] = jsonSeparator;
    */

    return root;
}

std::shared_ptr<BaseActionElement> BaseCardElement::DeserializeSelectAction(const Json::Value & json, AdaptiveCardSchemaKey key)
{
    Json::Value selectActionValue = ParseUtil::ExtractJsonValue(json, key, false);
    if (!selectActionValue.empty())
    {
        return ParseUtil::GetActionFromJsonValue(selectActionValue);
    }
    return nullptr;
}

Json::Value BaseCardElement::SerializeSelectAction(const std::shared_ptr<BaseActionElement> selectAction)
{
    if (selectAction != nullptr)
    {
        return selectAction->SerializeToJsonValue();
    }
    return Json::Value();
}
