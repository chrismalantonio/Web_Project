package model.champion;

import dbUtils.*;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class StringDataList {

    public String dbError = "";
    private ArrayList<StringData> recordList = new ArrayList();

    // Default constructor just leaves the 2 data members initialized as above
    public StringDataList() {
    }

    // overloaded constructor populates the list (and possibly the dbError)
    public StringDataList(String championNameStartsWith, DbConn dbc) {

        StringData sd = new StringData();

        System.out.println("Searching for champions that start with " + championNameStartsWith);

        try {

            String sql = "SELECT championID, championName, img, releaseDate, releaseNum FROM champion "
                    + " WHERE championName LIKE ? ORDER BY championName";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, championNameStartsWith + "%");
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                try {
                    sd = new StringData();
                    sd.championID = FormatUtils.formatInteger(results.getObject("championID"));
                    sd.championName = FormatUtils.formatString(results.getObject("championName"));
                    sd.img = FormatUtils.formatString(results.getObject("img"));
                    sd.releaseDate = FormatUtils.formatDate(results.getObject("releaseDate"));
                    sd.releaseNum = FormatUtils.formatLong(results.getObject("releaseNum")); 
                    this.recordList.add(sd);
                } catch (Exception e) {
                    sd.errorMsg = "Record Level Error in model.Champion.StringDataList Constructor: " + e.getMessage();
                    this.recordList.add(sd);
                }
            } // while
        } catch (Exception e) {
            this.dbError = "List Level Error in model.Champion.StringDataList Constructor: " + e.getMessage();
        }
    } // method

} // class
