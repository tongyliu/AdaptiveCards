#pragma once

#include "Enums.h"
#include "pch.h"
#include "BaseActionElement.h"
#include "BaseCardElement.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class Container : public BaseCardElement
{
friend class ContainerParser;
public:
    Container();
    Container(Spacing spacing, bool separator, ContainerStyle style);
    Container(Spacing spacing, bool separator, ContainerStyle style, std::vector<std::shared_ptr<BaseCardElement>>& items);

    virtual std::string Serialize();
    Json::Value SerializeToJsonValue();

    std::vector<std::shared_ptr<BaseCardElement>>& GetItems();
    const std::vector<std::shared_ptr<BaseCardElement>>& GetItems() const;

    ContainerStyle GetStyle() const;
    void SetStyle(const ContainerStyle value);

    std::shared_ptr<BaseActionElement> GetSelectAction() const;
    void SetSelectAction(const std::shared_ptr<BaseActionElement> action);

private:
    ContainerStyle m_style;
    std::vector<std::shared_ptr<AdaptiveCards::BaseCardElement>> m_items;
    std::shared_ptr<BaseActionElement> m_selectAction;
};

class ContainerParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}