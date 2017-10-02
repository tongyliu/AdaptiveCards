#pragma once

#include "pch.h"
#include "Enums.h"
#include "BaseCardElement.h"
#include "Column.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class ColumnSetParser;

class ColumnSet : public BaseCardElement
{
friend class ColumnSetParser;
public:
    ColumnSet();
    ColumnSet(std::vector<std::shared_ptr<Column>>& columns);

    virtual std::string Serialize();
    Json::Value SerializeToJsonValue();

    std::vector<std::shared_ptr<Column>>& GetColumns();
    const std::vector<std::shared_ptr<Column>>& GetColumns() const;

private:
    static const std::unordered_map<CardElementType, std::function<std::shared_ptr<Column>(const Json::Value&)>, EnumHash> ColumnParser;
    std::vector<std::shared_ptr<Column>> m_columns;
};

class ColumnSetParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);

};
}